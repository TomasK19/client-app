import api from "./api"; // Adjust the import path as needed
import { Booking } from "../types/booking";

export const calculateCost = async (bookingDetails: Partial<Booking>) => {
  try {
    const response = await api.post("/bookings/calculate", bookingDetails);
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
    const response = await api.post("/bookings/create", bookingDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking", error);
    throw error;
  }
};
