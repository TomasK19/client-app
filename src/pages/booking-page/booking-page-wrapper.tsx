import React from "react";
import { useParams, Navigate } from "react-router-dom";
import BookingPage from "./booking-page";
import { Hotel } from "../../types/hotel";
import api from "../../services/api";
import { useQuery } from "@tanstack/react-query";
const BookingPageWrapper: React.FC = () => {
  const { hotelId } = useParams<{ hotelId?: string }>();

  const fetchHotel = async (): Promise<Hotel> => {
    const response = await api.get<Hotel>(`/hotels/${hotelId}`);
    return response.data;
  };

  const {
    data: hotel,
    isLoading,
    isError,
    error,
  } = useQuery<Hotel, Error>({
    queryKey: ["hotel", hotelId],
    queryFn: fetchHotel,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError)
    return <p className="text-danger text-center mt-5">{error.message}</p>;

  if (!hotel) {
    return (
      <p className="text-danger text-center mt-5">No hotels data available.</p>
    );
  }

  return <BookingPage hotel={hotel} />;
};

export default BookingPageWrapper;
