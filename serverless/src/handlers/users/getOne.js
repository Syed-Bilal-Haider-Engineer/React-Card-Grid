const sendResponse = require("../../utils/response");
const { getUserById } = require("../../services/userService");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const user = await getUserById(id);

    if (!user) {
      return sendResponse(404, {
        message: "User not found",
      });
    }

    return sendResponse(200, user);
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
};