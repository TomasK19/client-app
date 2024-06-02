import React from "react";

interface BookingSummaryProps {
  totalCost: number | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ totalCost }) => {
  if (totalCost === null) return null;
  return <h4>Total Cost: €{totalCost}</h4>;
};

export default BookingSummary;
