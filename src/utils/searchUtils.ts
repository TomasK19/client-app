import { Hotel } from "../types/hotel";

export const filterHotelsByQuery = (
  hotels: Hotel[],
  query: string
): Hotel[] => {
  if (!query) return hotels;
  return hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(query.toLowerCase()) ||
      hotel.location.toLowerCase().includes(query.toLowerCase())
  );
};

export const filterHotelsByRatings = (
  hotels: Hotel[],
  ratings: number[]
): Hotel[] => {
  if (ratings.length === 0) return hotels;
  return hotels.filter((hotel) =>
    ratings.some((rating) => hotel.rating >= rating)
  );
};

export const filterHotelsByStarCounts = (
  hotels: Hotel[],
  starCounts: number[]
): Hotel[] => {
  if (starCounts.length === 0) return hotels;
  return hotels.filter((hotel) => starCounts.includes(hotel.starCount));
};

export const sortHotels = (hotels: Hotel[], sortOption: string): Hotel[] => {
  switch (sortOption) {
    case "rating_desc":
      return [...hotels].sort((a, b) => b.rating - a.rating);
    case "rating_asc":
      return [...hotels].sort((a, b) => a.rating - b.rating);
    case "stars_desc":
      return [...hotels].sort((a, b) => b.starCount - a.starCount);
    case "stars_asc":
      return [...hotels].sort((a, b) => a.starCount - b.starCount);
    default:
      return hotels;
  }
};
