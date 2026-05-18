const sendResponse = require("../../utils/response");

const {
  uploadUserImage,
} = require("../../services/galleryService.js");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const imageUrl = await uploadUserImage(body);

    return sendResponse(200, {
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
};