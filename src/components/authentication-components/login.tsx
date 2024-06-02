import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./auth-context";
import { jwtDecode } from "jwt-decode";
import "./auth-forms.css";
import { ErrorResponse } from "../../types/error";

interface DecodedToken {
  username: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:5001/api/users/login",
        { username, password }
      );
      const { token, email: userEmail, userId } = response.data;
      const decodedToken = jwtDecode<DecodedToken>(token);
      const userUsername = decodedToken.username; // Retrieve username from token
      login(token, userEmail, userId, userUsername);
      navigate("/");
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
          setMessage("Login failed");
        }
      } else {
        setMessage("Login failed");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="auth-page-container">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
        </form>
        <p className="error-message">{message}</p>
        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
