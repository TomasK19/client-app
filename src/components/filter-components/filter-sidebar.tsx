import React from "react";
import "./filter-sidebar.css";

interface FilterSidebarProps {
  ratingOptions: { label: string; value: number }[];
  starOptions: { label: string; value: number }[];
  selectedRatings: number[];
  selectedStarCounts: number[];
  onRatingChange: (value: number) => void;
  onStarCountChange: (value: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  ratingOptions,
  starOptions,
  selectedRatings,
  selectedStarCounts,
  onRatingChange,
  onStarCountChange,
}) => {
  return (
    <div className="filter-sidebar">
      <h3>Property rating</h3>
      <div className="filter-section">
        {ratingOptions.map((option) => (
          <div key={option.value} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`rating-${option.value}`}
              checked={selectedRatings.includes(option.value)}
              onChange={() => onRatingChange(option.value)}
            />
            <label
              className="form-check-label"
              htmlFor={`rating-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <h3>Star count</h3>
      <div className="filter-section">
        {starOptions.map((option) => (
          <div key={option.value} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`star-${option.value}`}
              checked={selectedStarCounts.includes(option.value)}
              onChange={() => onStarCountChange(option.value)}
            />
            <label
              className="form-check-label"
              htmlFor={`star-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
