const sendResponse = require("../../utils/response");
const { loginUser } = require("../../services/authService");

exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(
      event.body || "{}"
    );

    if (!email || !password) {
      return sendResponse(400, {
        message: "Email and password are required",
      });
    }

    const data = await loginUser(email, password);

    return sendResponse(200, data);
  } catch (error) {
    return sendResponse(401, {
      error: error.message,
    });
  }
};