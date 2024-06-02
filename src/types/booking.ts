import { Hotel } from "./hotel";

export interface Booking {
  id: number;
  hotelId: number;
  hotel: Hotel;
  roomId: number;
  roomType: string;
  startDate: Date;
  endDate: Date;
  numberOfNights: number;
  numberOfGuests: number;
  includeBreakfast: boolean;
  totalCost: number;
  userId: number;
}
