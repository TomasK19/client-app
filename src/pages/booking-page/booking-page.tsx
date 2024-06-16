import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/authentication-components/auth-context";
import { Hotel } from "../../types/hotel";
import { Room } from "../../types/room";
import RoomList from "../../components/booking-components/room-list/room-list";
import BookingForm from "../../components/booking-components/booking-form/booking-form";
import "./booking-page.css";

interface BookingPageProps {
  hotel: Hotel;
}

const BookingPage: React.FC<BookingPageProps> = ({ hotel }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (hotel.rooms && hotel.rooms.length > 0) {
      setSelectedRoom(sortRoomsByType(hotel.rooms)[0]);
    }
  }, [hotel.rooms]);

  const sortRoomsByType = (rooms: Room[]): Room[] => {
    const typeOrder: Array<Room["type"]> = ["Standard", "Deluxe", "Suite"];
    return rooms.sort(
      (a, b) => typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
    );
  };

  const handleRoomSelect = useCallback((room: Room) => {
    setSelectedRoom(room);
  }, []);

  return (
    <div className="booking-container">
      <h2 className="text-center mb-4">{hotel.name} - Booking</h2>
      <RoomList
        rooms={sortRoomsByType(hotel.rooms)}
        selectedRoom={selectedRoom}
        handleRoomSelect={handleRoomSelect}
      />

      {selectedRoom && (
        <BookingForm
          hotel={hotel}
          selectedRoom={selectedRoom}
          auth={auth}
          navigate={navigate}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default BookingPage;
