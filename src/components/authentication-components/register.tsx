import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth-forms.css";
import ConfirmationModal from "./confirmation-modal/confirmation-modal";
import ErrorMessage from "../error-components/error-message/error-message";
import { ErrorResponse } from "../../types/error";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/users/register",
        { email, username, password }
      );
      setMessage("");
      setIsRegistered(true);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          setMessage(errorMessages);
        } else if (err.response.data.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Registration failed");
        }
      } else {
        setMessage("Registration failed");
      }
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/users/verify-email",
        { email, verificationCode }
      );
      setMessage("");
      setIsRegistered(false);
      setIsConfirmationOpen(true);
    } catch (error) {
      const err = error as ErrorResponse;
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          const errorMessages = Object.values(err.response.data.errors)
            .flat()
            .join(" ");
          setMessage(errorMessages);
        } else if (err.response.data.error) {
          setMessage(err.response.data.error);
        } else {
          setMessage("Email verification failed");
        }
      } else {
        setMessage("Email verification failed");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Invalid email address");
      return;
    }

    if (!isRegistered && password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return;
    }

    if (isRegistered) {
      handleVerifyEmail();
    } else {
      handleRegister();
    }
  };

  const handleCloseModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleGoToLogin = () => {
    setIsConfirmationOpen(false);
    navigate("/login");
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <h2>{isRegistered ? "Verify Email" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            disabled={isRegistered}
          />
          {!isRegistered && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </>
          )}
          {isRegistered && (
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Verification Code"
              required
            />
          )}
          <button type="submit">
            {isRegistered ? "Verify Email" : "Register"}
          </button>
        </form>
        <ErrorMessage message={message} />
      </div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={handleCloseModal}
        onLogin={handleGoToLogin}
        message="Email verified successfully. You can now log in."
      />
    </div>
  );
};

export default Register;
