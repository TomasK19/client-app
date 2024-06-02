import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import { Hotel } from "../../../types/hotel";
import { Room } from "../../../types/room";
import { Booking } from "../../../types/booking";
import {
  calculateCost,
  createBooking,
} from "../../../services/booking-service";
import BreakfastCheckbox from "../breakfast-checkbox";
import BookingSummary from "../booking-summary";
import { useNavigate } from "react-router-dom";
import { AuthContextProps } from "../../../components/authentication-components/auth-context";
import RoomTypeSelector from "../room-type-selector";
import "react-datepicker/dist/react-datepicker.css";
import BookingConfirmationModal from "../booking-confirmation-modal/booking-confirmation-modal";
import AuthenticationWarningModal from "../../authentication-components/authentication-warning-modal/authentication-warning-modal";
import BookingSuccessModal from "../booking-success-modal/booking-success-modal";

interface BookingFormProps {
  hotel: Hotel;
  selectedRoom: Room;
  auth: AuthContextProps;
  navigate: ReturnType<typeof useNavigate>;
  errorMessage: string | null;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

const BookingForm: React.FC<BookingFormProps> = ({
  hotel,
  selectedRoom,
  auth,
  navigate,
  errorMessage,
  setErrorMessage,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfGuests, setNumberOfGuests] = useState<number>(1);
  const [includeBreakfast, setIncludeBreakfast] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const [isAuthWarningOpen, setIsAuthWarningOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);

  useEffect(() => {
    if (startDate && endDate && selectedRoom) {
      handleCalculateCost();
    }
  }, [startDate, endDate, numberOfGuests, includeBreakfast, selectedRoom]);

  const handleCalculateCost = useCallback(async () => {
    if (!startDate || !endDate || !selectedRoom) {
      console.error("Start date, end date, and room must be set");
      return;
    }

    const bookingDetails: Partial<Booking> = {
      startDate: startDate,
      endDate: endDate,
      numberOfGuests: numberOfGuests || 0,
      includeBreakfast,
      roomId: selectedRoom.id,
    };

    try {
      const cost = await calculateCost(bookingDetails);
      setTotalCost(cost);
    } catch (error) {
      console.error("Error calculating total cost", error);
    }
  }, [
    startDate,
    endDate,
    selectedRoom,
    numberOfGuests,
    includeBreakfast,
    hotel.id,
  ]);

  const handleBooking = async () => {
    if (
      !startDate ||
      !endDate ||
      startDate >= endDate ||
      !selectedRoom ||
      numberOfGuests === null
    ) {
      setErrorMessage(
        "Check-in date must be before check-out date, room must be selected, and number of guests must be specified"
      );
      return;
    }

    if (!auth.auth.token) {
      setIsAuthWarningOpen(true);
      return;
    }

    const bookingDetails: Partial<Booking> = {
      hotelId: hotel.id,
      roomId: selectedRoom.id,
      startDate: startDate,
      endDate: endDate,
      numberOfGuests: numberOfGuests,
      includeBreakfast,
      totalCost: totalCost || 0,
    };

    try {
      setIsBooking(true);
      await createBooking(bookingDetails, auth.auth.token);
      setIsSuccessOpen(true);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const responseData = error.response.data;
        if (responseData.error && responseData.error.includes("expired")) {
          setErrorMessage("Session expired. Please log in again.");
        } else {
          setErrorMessage(responseData.error || "Error creating booking");
        }
      } else {
        setErrorMessage("Error creating booking");
      }
      setIsBooking(false);
    }
  };

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const generateGuestOptions = () => {
    const options = [];
    for (let i = 1; i <= selectedRoom.maxNumberOfGuests; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const handleConfirmBooking = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleFinalBooking = () => {
    handleBooking();
    handleCloseConfirmation();
  };

  const handleCloseAuthWarning = () => {
    setIsAuthWarningOpen(false);
  };

  const handleNavigateToBookings = () => {
    setIsSuccessOpen(false);
    navigate("/user-bookings");
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="startDate">Check-in date</label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            id="startDate"
            minDate={new Date()}
            maxDate={addDays(new Date(), 365)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Check-out date</label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate ? addDays(startDate, 1) : new Date()}
            maxDate={addDays(new Date(), 365)}
            dateFormat="yyyy/MM/dd"
            className="form-control"
            id="endDate"
            disabled={!startDate}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numberOfGuests">Number of Guests</label>
          <select
            id="numberOfGuests"
            className="form-control"
            value={numberOfGuests}
            onChange={(e) => setNumberOfGuests(Number(e.target.value))}
            required
          >
            <option value="" disabled>
              Select number of guests
            </option>
            {generateGuestOptions()}
          </select>
        </div>
        <RoomTypeSelector roomType={selectedRoom.type} />
        <BreakfastCheckbox
          includeBreakfast={includeBreakfast}
          setIncludeBreakfast={setIncludeBreakfast}
        />
        <p>€20 cleaning charge is applied for the stay</p>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <div className="cost-button-container">
          <BookingSummary totalCost={totalCost} />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleConfirmBooking}
            disabled={
              isBooking || !startDate || !endDate || startDate >= endDate
            }
          >
            {isBooking ? "Booking..." : "Book Now"}
          </button>
        </div>
      </form>
      <BookingConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        onConfirm={handleFinalBooking}
        bookingDetails={{
          hotelName: hotel.name,
          roomType: selectedRoom.type,
          startDate: startDate?.toLocaleDateString() || "",
          endDate: endDate?.toLocaleDateString() || "",
          numberOfGuests,
          includeBreakfast,
          totalCost,
        }}
      />
      <AuthenticationWarningModal
        isOpen={isAuthWarningOpen}
        onClose={handleCloseAuthWarning}
      />
      <BookingSuccessModal
        isOpen={isSuccessOpen}
        onClose={handleNavigateToBookings}
        onNavigate={handleNavigateToBookings}
      />
    </>
  );
};

export default BookingForm;
