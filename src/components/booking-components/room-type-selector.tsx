import React from "react";

interface RoomTypeSelectorProps {
  roomType: "Standard" | "Deluxe" | "Suite";
}

const RoomTypeSelector: React.FC<RoomTypeSelectorProps> = ({ roomType }) => {
  return (
    <div className="form-group">
      <label htmlFor="roomType">Room Type</label>
      <select id="roomType" className="form-control" value={roomType} disabled>
        <option value="Standard">Standard (€100/night)</option>
        <option value="Deluxe">Deluxe (€150/night)</option>
        <option value="Suite">Suite (€200/night)</option>
      </select>
    </div>
  );
};

export default RoomTypeSelector;
