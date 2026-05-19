import {
  fetchGalleryApi,
  uploadImageApi,
  fetchAllGalleryImagesApi
} from "./gallery.api";

export const uploadImage = async (payload: any) => {
  return uploadImageApi(payload);
};

export const fetchGallery = async (
  email: string
) => {
  return fetchGalleryApi(email);
};

export const fetchAllGalleryImages = async () => {
  return fetchAllGalleryImagesApi();
};