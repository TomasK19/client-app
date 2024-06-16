import React, { useEffect, useState } from "react";
import axios from "axios";
import "./user-bookings.css";
import { useAuth } from "../../authentication-components/auth-context";
import { Booking } from "../../../types/booking";
import UserBookingCard from "../user-booking-card/user-booking-card";
import api from "../../../services/api";
import { useQuery } from "@tanstack/react-query";

const UserBookings: React.FC = () => {
  const { auth } = useAuth();

  const fetchBookings = async (): Promise<Booking[]> => {
    const response = await api.get<Booking[]>("/bookings/user-bookings", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    return response.data;
  };

  const {
    data: bookings,
    isLoading,
    isError,
    error,
  } = useQuery<Booking[], Error>({
    queryKey: ["bookings"],
    queryFn: fetchBookings,
  });

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (isError)
    return <p className="text-danger text-center mt-5">{error.message}</p>;

  if (!bookings) {
    return (
      <p className="text-danger text-center mt-5">No hotels data available.</p>
    );
  }

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
