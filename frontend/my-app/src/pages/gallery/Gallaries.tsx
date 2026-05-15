import { useEffect, useState } from "react";


import "./Gallery.styles.css";
import type { GalleryItem } from "../../features/gallery/gallery.types";
import { getUserEmail } from "../../utils/storage";
import { fetchGallery, uploadImage } from "../../features/gallery/gallery.service";
import { UploadModal } from "../../Components/gallary/UploadImage";
import PortalModal from './../../Shared/Model/Model';

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadGallery = async () => {
    const email = getUserEmail();

    if (!email) return;

    setLoading(true);

    try {
      const data = await fetchGallery(email);
      setImages(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (
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

      await loadGallery();

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

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
          onUpload={handleUpload}
        />
      </PortalModal>
    </>
  );
};

export default Gallery;