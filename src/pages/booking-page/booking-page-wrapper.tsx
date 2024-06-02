import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import BookingPage from './booking-page';
import useHotel from '../../hooks/hotel-hooks/use-hotel';

const BookingPageWrapper: React.FC = () => {
  const { hotelId } = useParams<{ hotelId?: string }>();
  const { hotel, loading, error } = useHotel(hotelId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Navigate to="/error" replace />;
  }

  if (!hotel) {
    return <Navigate to="/error" replace />;
  }

  return <BookingPage hotel={hotel} />;
};

export default BookingPageWrapper;
