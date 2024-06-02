import React from "react";
import { useNavigate } from "react-router-dom";
import { Hotel } from "../../../types/hotel";
import "./hotel-card.css";

interface HotelProps {
  hotel: Hotel;
}

const HotelCard: React.FC<HotelProps> = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate(`/booking/${hotel.id}`);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <span key={i} className="star filled">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="star">
            ☆
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <div className="card hotel-card">
      <img
        src={hotel.pictureUrl}
        className="hotel-image"
        alt={`${hotel.name}`}
      />
      <div className="card-body">
        <h5 className="card-title">{hotel.name}</h5>
        <div className="rating-stars">{renderStars(hotel.starCount)}</div>
        <p className="card-text">{hotel.location}</p>
        <p className="card-text">
          <span className="hotel-rating">{hotel.rating}</span> -{" "}
          <span className="review-count">{hotel.numberOfRatings} reviews</span>
        </p>
        <button className="btn btn-primary" onClick={handleBookNow}>
          Book a Room
        </button>
      </div>
    </div>
  );
};

export default HotelCard;
