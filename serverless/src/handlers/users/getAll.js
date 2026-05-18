const sendResponse = require("../../utils/response");
const { getAllUsers } = require("../../services/userService");

exports.handler = async () => {
  try {
    const users = await getAllUsers();

    return sendResponse(200, users);
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
};