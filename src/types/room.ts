import { RoomPicture } from "./room-picture";

export interface Room {
  id: number;
  type: "Standard" | "Deluxe" | "Suite";
  price: number;
  pictures: RoomPicture[];
  maxNumberOfGuests: number;
}
