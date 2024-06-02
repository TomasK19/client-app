import React from "react";
import "./image-modal.css";

interface ImageModalProps {
  isOpen: boolean;
  images: string[];
  currentImageIndex: number;
  onClose: () => void;
  onPrev: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  images,
  currentImageIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="image-modal-close" onClick={onClose}>
          &times;
        </span>
        <button className="image-modal-prev" onClick={onPrev}>
          &#10094;
        </button>
        <img src={images[currentImageIndex]} alt="Room" />
        <div className="image-modal-index">
          {currentImageIndex + 1} / {images.length}
        </div>
        <button className="image-modal-next" onClick={onNext}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
