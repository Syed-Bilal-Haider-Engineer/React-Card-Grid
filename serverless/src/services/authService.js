const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const {
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = require("./dynamicdb.js");
const { TABLE_NAME, JWT_SECRET } = require("../config/env");

const signUpUser = async (body) => {
  console.log("Signing up user with email:", body.email);
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = {
    id: crypto.randomUUID(),
    ...body,
    password: hashedPassword,
  };

  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: newUser,
    })
  );

  delete newUser.password;

  return newUser;
};
const loginUser = async (email, password) => {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    })
  );

  const user = result.Items?.[0];

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};

module.exports = {
  signUpUser,
  loginUser,
};