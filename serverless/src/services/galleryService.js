const {
  QueryCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const {
  PutObjectCommand,
} = require("@aws-sdk/client-s3");

const docClient = require("./dynamicdb.js");
const s3Client = require("./s3.js");

const {
  TABLE_NAME,
  BUCKET_NAME,
} = require("../config/env.js");

const uploadUserImage = async ({
  email,
  imageBase64,
  fileName,
}) => {
  const userLookup = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: "EmailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email,
      },
    })
  );
  const user = userLookup.Items?.[0];

  if (!user) {
    throw new Error("User record not found");
  }

  const base64Data = imageBase64.replace(
    /^data:image\/\w+;base64,/,
    ""
  );

  const buffer = Buffer.from(base64Data, "base64");

  const key = `profiles/${email}/${Date.now()}-${fileName}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
      ACL: "public-read",
    })
  );

  const imageUrl = `https://${BUCKET_NAME}.s3.amazonaws.com/${key}`;

  await docClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        id: user.id,
      },
      UpdateExpression:
        "SET gallery = list_append(if_not_exists(gallery, :empty_list), :new_image)",
      ExpressionAttributeValues: {
        ":new_image": [
          {
            url: imageUrl,
            fileName,
            uploadedAt: new Date().toISOString(),
          },
        ],
        ":empty_list": [],
      },
    })
  );

  return imageUrl;
};

const getUserGallery = async (email) => {
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

  return user.gallery || [];
};

module.exports = {
  uploadUserImage,
  getUserGallery,
};