import React, { useState } from "react";
import "./room-card.css";
import ImageModal from "../image-modal/image-modal";
import { Room } from "../../../types/room";

interface RoomCardProps {
  room: Room;
  onRoomSelect: (room: Room) => void;
  isSelected: boolean;
}

const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onRoomSelect,
  isSelected,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.pictures.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.pictures.length);
  };

  const handleCardClick = () => {
    onRoomSelect(room);
  };

  return (
    <div
      className={`room-card ${isSelected ? "selected" : ""}`}
      onClick={handleCardClick}
    >
      <div className="room-image" onClick={handleImageClick}>
        <img
          src={room.pictures[currentImageIndex].url}
          alt={`${room.type} room`}
        />
        {room.pictures.length > 1 && (
          <div className="photo-count-label">
            {currentImageIndex + 1} / {room.pictures.length}
          </div>
        )}
        <div className="photo-view-hint">Click to view photos</div>
      </div>
      <div className="room-details">
        <div>
          <p className="room-type">{room.type}</p>
          <p className="room-price">Daily rate € {room.price}</p>
          <p className="room-price">{room.maxNumberOfGuests} guests</p>
          <button className="reserve-button" onClick={handleCardClick}>
            Select
          </button>
        </div>
      </div>
      <ImageModal
        isOpen={isModalOpen}
        images={room.pictures.map((p) => p.url)}
        currentImageIndex={currentImageIndex}
        onClose={handleCloseModal}
        onPrev={handlePrevImage}
        onNext={handleNextImage}
      />
    </div>
  );
};

export default RoomCard;
