import { Booking } from "./booking";
import { Room } from "./room";

export interface Hotel {
  id: number;
  name: string;
  location: string;
  pictureUrl: string;
  bookings: Booking[];
  rooms: Room[];
  rating: number;
  numberOfRatings: number;
  starCount: number;
}
