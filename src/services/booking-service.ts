import axios from "axios";
import { Booking } from "../types/booking";

export const calculateCost = async (bookingDetails: Partial<Booking>) => {
  try {
    const response = await axios.post(
      "https://localhost:5001/api/bookings/calculate",
      bookingDetails
    );
    return response.data;
  } catch (error) {
    console.error("Error calculating total cost", error);
    throw error;
  }
};

export const createBooking = async (
  bookingDetails: Partial<Booking>,
  token: string
) => {
  try {
    const response = await axios.post(
      "https://localhost:5001/api/bookings/create",
      bookingDetails,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating booking", error);
    throw error;
  }
};
