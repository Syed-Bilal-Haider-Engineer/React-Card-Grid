import { useEffect } from "react";
import './ImageModel.styles.css'

type Props = {
  isOpen: boolean;
  imageUrl: string;
  title?: string;
  onClose: () => void;
};

const ImageModal = ({ isOpen, imageUrl, title, onClose }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">{title || "Preview"}</h3>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="divider" />

        {/* Image */}
        <div className="image-wrapper">
          <img src={imageUrl} alt={title || "preview"} />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;