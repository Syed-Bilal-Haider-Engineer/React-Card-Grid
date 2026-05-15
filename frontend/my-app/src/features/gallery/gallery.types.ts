export interface GalleryItem {
  url: string;
  fileName: string;
}

export interface UploadPayload {
  email: string;
  base64Image: string;
  fileName: string;
}