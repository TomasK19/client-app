import React from "react";
import { Room } from "../../../types/room";
import RoomCard from "../room-card/room-card";
import "./room-list.css";

interface RoomListProps {
  rooms: Room[];
  selectedRoom: Room | null;
  handleRoomSelect: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({
  rooms,
  selectedRoom,
  handleRoomSelect,
}) => {
  return (
    <div className="room-cards">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
          onRoomSelect={handleRoomSelect}
          isSelected={selectedRoom?.id === room.id}
        />
      ))}
    </div>
  );
};

export default RoomList;
