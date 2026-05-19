import { useEffect, useState } from "react";

import "./Gallery.styles.css";
import type { GalleryItem } from "../../features/gallery/gallery.types";
import { fetchAllGalleryImages } from "../../features/gallery/gallery.service";
import ImageModal from "../../Shared/Model/ImageModel";

const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadGallery = async () => {
    setLoading(true);

    try {
      const data = await fetchAllGalleryImages();
      console.log("Fetched gallery data:", data);
      setImages(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  // const handleUpload = async (
  //   base64Image: string,
  //   fileName: string
  // ) => {
  //   const email = getUserEmail();

  //   if (!email) return;

  //   try {
  //     await uploadImage({
  //       email,
  //       base64Image,
  //       fileName,
  //     });

  //     setSuccess("Image uploaded successfully");

  //     await loadGallery();

  //     setIsModalOpen(false);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Upload failed");
  //   }
  // };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <>
      <div className="Gallaries-container">
        <header className="Gallaries-header">
          <h3>My Gallery</h3>
          <button className="upload-btn" onClick={() => setIsModalOpen(true)}>
            + Upload New Image
          </button>
        </header>

        {loading && <p>Loading gallery...</p>}

        {error && <p className="error">{error}</p>}

        {success && <p className="success">{success}</p>}

        <div className="image-grid">
          {images?.length > 0
            ? images.map((img, index) => (
                <div key={index} className="image-card" onClick={() => setSelectedImage(img)}>
                  <img src={img.url} alt={img.fileName} />

                  <div className="image-info">
                    <span>{img.fileName?.substring(0, 20)}...</span>
                  </div>
                </div>
              ))
            : !loading && <p>No images found in the gallery.</p>}
        </div>
      </div>

      {/* 
      <PortalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpload={handleUpload}
        />
      </PortalModal> */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          imageUrl={selectedImage.url}
          title={selectedImage.fileName}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};

export default Gallery;
