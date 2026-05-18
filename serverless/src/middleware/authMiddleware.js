const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env");

const verifyToken = (event) => {
  const authHeader = event.headers.Authorization;

  if (!authHeader) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  return jwt.verify(token, JWT_SECRET);
};

module.exports = verifyToken;