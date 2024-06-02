import React from "react";
import { Booking } from "../../../types/booking";
import "./user-booking-card.css";

interface UserBookingCardProps {
  booking: Booking;
}

const UserBookingCard: React.FC<UserBookingCardProps> = ({ booking }) => {
  return (
    <div className="card booking-card">
      <img
        src={booking.hotel.pictureUrl}
        className="card-img-top booking-hotel-image"
        alt={`${booking.hotel.name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{booking.hotel.name}</h5>
        <p className="card-text">{booking.hotel.location}</p>
        <p className="card-text">Room: {booking.roomType}</p>
        <p className="card-text">Number of Nights: {booking.numberOfNights}</p>
        <p className="card-text">
          Check-in: {new Date(booking.startDate).toLocaleDateString()}
        </p>
        <p className="card-text">
          Check-out: {new Date(booking.endDate).toLocaleDateString()}
        </p>
        <p className="card-text">Total Cost: €{booking.totalCost}</p>
      </div>
    </div>
  );
};

export default UserBookingCard;
