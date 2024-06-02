import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./hotel-list.css";

import { Hotel } from "../../../types/hotel";
import {
  filterHotelsByQuery,
  filterHotelsByRatings,
  filterHotelsByStarCounts,
  sortHotels,
} from "../../../utils/searchUtils";
import HotelCard from "../hotel-card/hotel-card";
import useHotels from "../../../hooks/hotel-hooks/use-hotels";
import FilterSidebar from "../../filter-components/filter-sidebar";

const ratingOptions = [
  { label: "9 and above", value: 9 },
  { label: "8 and above", value: 8 },
  { label: "7 and above", value: 7 },
  { label: "6 and above", value: 6 },
  { label: "Up to 6", value: 0 },
];

const starOptions = [
  { label: "5 stars", value: 5 },
  { label: "4 stars", value: 4 },
  { label: "3 stars", value: 3 },
  { label: "2 stars", value: 2 },
  { label: "1 star", value: 1 },
];

const sortOptions = [
  { label: "Rating: High to Low", value: "rating_desc" },
  { label: "Rating: Low to High", value: "rating_asc" },
  { label: "Stars: High to Low", value: "stars_desc" },
  { label: "Stars: Low to High", value: "stars_asc" },
];

const HotelList: React.FC = () => {
  const { hotels, loading, error } = useHotels();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedStarCounts, setSelectedStarCounts] = useState<number[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRatingChange = (value: number) => {
    setSelectedRatings((prevSelectedRatings) =>
      prevSelectedRatings.includes(value)
        ? prevSelectedRatings.filter((rating) => rating !== value)
        : [...prevSelectedRatings, value]
    );
  };

  const handleStarCountChange = (value: number) => {
    setSelectedStarCounts((prevSelectedStarCounts) =>
      prevSelectedStarCounts.includes(value)
        ? prevSelectedStarCounts.filter((count) => count !== value)
        : [...prevSelectedStarCounts, value]
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const filteredHotelsByQuery = filterHotelsByQuery(hotels, searchTerm);
  const filteredHotelsByRatings =
    selectedRatings.length > 0
      ? filterHotelsByRatings(filteredHotelsByQuery, selectedRatings)
      : filteredHotelsByQuery;
  const filteredHotelsByStars =
    selectedStarCounts.length > 0
      ? filterHotelsByStarCounts(filteredHotelsByRatings, selectedStarCounts)
      : filteredHotelsByRatings;
  const filteredAndSortedHotels = sortHotels(filteredHotelsByStars, sortOption);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;

  return (
    <div className="hotel-list-page">
      <FilterSidebar
        ratingOptions={ratingOptions}
        starOptions={starOptions}
        selectedRatings={selectedRatings}
        selectedStarCounts={selectedStarCounts}
        onRatingChange={handleRatingChange}
        onStarCountChange={handleStarCountChange}
      />
      <div className="hotel-list-container">
        <h2>Hotels</h2>
        <div className="search-bar-container">
          <input
            type="text"
            className="form-control search-bar"
            placeholder="Search by location or hotel name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="sort-bar-container">
          <select
            className="form-select sort-bar"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Sort by</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="hotel-list">
          {filteredAndSortedHotels.length > 0 ? (
            filteredAndSortedHotels.map((hotel: Hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))
          ) : (
            <p className="no-hotels-message">
              No hotels found for the specified location and rating.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
