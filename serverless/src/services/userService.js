const {
  GetCommand,
  ScanCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const docClient = require("./dynamicdb.js");
const { TABLE_NAME } = require("../config/env");

const getUserById = async (id) => {
  const result = await docClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );

  return result.Item;
};

const getAllUsers = async () => {
  const result = await docClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    })
  );

  return result.Items;
};

const deleteUser = async (id) => {
  await docClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id },
    })
  );
};

module.exports = {
  getUserById,
  getAllUsers,
  deleteUser,
};