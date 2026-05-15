import type { UploadImageParams } from "../types/types";

export const uploadImage = async ({
  email,
  base64Image,
  fileName,
}: UploadImageParams) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/uploadImage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          imageBase64: base64Image,
          fileName,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Upload failed"
      );
    }

    return data;
  } catch (error) {
    console.error("Upload Error:", error);
    throw error;
  }
};

export const fetchGalleryApi = async (email: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/gallery/${email}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to fetch gallery"
    );
  }

  return data;
};