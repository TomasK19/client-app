import React from "react";
import "./booking-confirmation-modal.css";

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bookingDetails: {
    hotelName: string;
    roomType: string;
    startDate: string;
    endDate: string;
    numberOfGuests: number;
    includeBreakfast: boolean;
    totalCost: number | null;
  };
}

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bookingDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="booking-confirmation-modal-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Confirm Booking</h3>
        <div className="booking-details">
          <p>
            <strong>Hotel:</strong> {bookingDetails.hotelName}
          </p>
          <p>
            <strong>Room Type:</strong> {bookingDetails.roomType}
          </p>
          <p>
            <strong>Check-in Date:</strong> {bookingDetails.startDate}
          </p>
          <p>
            <strong>Check-out Date:</strong> {bookingDetails.endDate}
          </p>
          <p>
            <strong>Number of Guests:</strong> {bookingDetails.numberOfGuests}
          </p>
          <p>
            <strong>Breakfast Included:</strong>{" "}
            {bookingDetails.includeBreakfast ? "Yes" : "No"}
          </p>
          <p>
            <strong>Total Cost:</strong> €{bookingDetails.totalCost}
          </p>
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationModal;
