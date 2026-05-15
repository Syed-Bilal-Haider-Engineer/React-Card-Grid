import { useEffect, useState, useCallback } from "react";
import PortalModal from "../../Shared/Model/Model";
import "./Gallaries.css";
import { UploadModal } from "../UploadImage/UploadImage";
import type { GalleryItem } from "../../types/types";
import { fetchGalleryApi, uploadImage } from "../../services/image.api";

export const Gallaries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getUserEmail = () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user") || "null"
      );
      return user?.user?.email || null;
    } catch {
      return null;
    }
  };

  const fetchGallery = useCallback(async () => {
    const email = getUserEmail();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const data = await fetchGalleryApi(email);
      setImages(data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load gallery"
      );
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleImageUpload = async (
    base64Image: string,
    fileName: string
  ) => {
    const email = getUserEmail();
    if (!email) return;

    try {
      await uploadImage({
        email,
        base64Image,
        fileName,
      });

      setSuccess("Image uploaded successfully");
      await fetchGallery();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Upload failed"
      );
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  return (
    <>
      <div className="Gallaries-container">
        <header className="Gallaries-header">
          <h1>My Gallery</h1>

          <button
            className="upload-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + Upload New Image
          </button>
        </header>

        {loading && <p>Loading gallery...</p>}

        {error && (
          <p className="error">{error}</p>
        )}

        {success && (
          <p className="success">{success}</p>
        )}

        <div className="image-grid">
          {images.length > 0 ? (
            images.map((img, index) => (
              <div
                key={index}
                className="image-card"
              >
                <img
                  src={img.url}
                  alt={img.fileName}
                />

                <div className="image-info">
                  <span>{img.fileName}</span>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <p>No images found in the gallery.</p>
            )
          )}
        </div>
      </div>

      <PortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleImageUpload}
        />
      </PortalModal>
    </>
  );
};

export default Gallaries;