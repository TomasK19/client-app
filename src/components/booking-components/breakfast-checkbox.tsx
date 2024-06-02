import React from "react";

interface BreakfastCheckboxProps {
  includeBreakfast: boolean;
  setIncludeBreakfast: (include: boolean) => void;
}

const BreakfastCheckbox: React.FC<BreakfastCheckboxProps> = ({
  includeBreakfast,
  setIncludeBreakfast,
}) => {
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        id="includeBreakfast"
        className="form-check-input"
        checked={includeBreakfast}
        onChange={(e) => setIncludeBreakfast(e.target.checked)}
      />
      <label className="form-check-label" htmlFor="includeBreakfast">
        Include Breakfast (€15/person/day)
      </label>
    </div>
  );
};

export default BreakfastCheckbox;
