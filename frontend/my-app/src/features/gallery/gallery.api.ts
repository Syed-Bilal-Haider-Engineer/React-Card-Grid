import { apiClient } from "../../services/apiClient";
import { ENDPOINTS } from "../../services/endpoints";
import type { UploadPayload } from "./gallery.types";

export const uploadImageApi = async (
  payload: UploadPayload
) => {
  return apiClient(ENDPOINTS.UPLOAD_IMAGE, {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      imageBase64: payload.base64Image,
      fileName: payload.fileName,
    }),
  });
};

export const fetchGalleryApi = async (
  email: string
) => {
  return apiClient(`${ENDPOINTS.GALLERY}/${email}`);
};

export const fetchAllGalleryImagesApi = async () => {
  return apiClient(ENDPOINTS.ALL_GALLERY_IMAGES); 
}