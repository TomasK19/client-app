import React from "react";
import "./booking-success-modal.css";

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Booking Successful</h3>
        <p>Your booking has been successfully completed.</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onNavigate}>
            Go to My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccessModal;
