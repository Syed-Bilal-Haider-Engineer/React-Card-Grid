const sendResponse = require("../../utils/response");
const { signUpUser } = require("../../services/authService.js");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.password) {
      return sendResponse(400, {
        message: "Password is required",
      });
    }

    const user = await signUpUser(body);

    return sendResponse(201, {
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
};