import React from "react";
import "./error-message.css";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return <p className="error-message">{message}</p>;
};

export default ErrorMessage;
