const sendResponse = require("../../utils/response");

const {
  getUserGallery,
  getUserAllGalleryImages
} = require("../../services/galleryService.js");

exports.handler = async (event) => {
  try {
    const { email } = event.pathParameters;

    const gallery = await getUserGallery(email);

    return sendResponse(200, gallery);
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
}

exports.handler = async () => {
  try {

    const gallery = await getUserAllGalleryImages();

    return sendResponse(200, gallery);
  } catch (error) {
    return sendResponse(500, {
      error: error.message,
    });
  }
}