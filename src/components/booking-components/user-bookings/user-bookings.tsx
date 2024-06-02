import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user-bookings.css";
import { useAuth } from "../../authentication-components/auth-context";
import { Booking } from "../../../types/booking";
import UserBookingCard from "../user-booking-card/user-booking-card";

const UserBookings: React.FC = () => {
  const { auth } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://localhost:5001/api/bookings/user-bookings",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching bookings", error);
      }
    };

    if (auth.token) {
      fetchBookings();
    }
  }, [auth.token]);

  if (!auth.token) {
    return <p>Please log in to see your bookings.</p>;
  }

  return (
    <div className="user-bookings-container">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <div className="booking-cards">
          {bookings.map((booking) => (
            <UserBookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <p>You have no bookings.</p>
      )}
    </div>
  );
};

export default UserBookings;
