export interface SignupUserTypes {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface GalleryItem {
  url: string;
  fileName: string;
}

export type UploadImageParams = {
  email: string;
  base64Image: string;
  fileName: string;
};