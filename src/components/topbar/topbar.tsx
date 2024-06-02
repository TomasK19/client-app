import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { useAuth } from "../authentication-components/auth-context";

const Topbar: React.FC = () => {
  const { auth, logout } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-center">
        <Link to="/" className="topbar-link">
          Home
        </Link>
        {!auth.username ? (
          <>
            <Link to="/login" className="topbar-link">
              Login
            </Link>
            <Link to="/register" className="topbar-link">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/user-bookings" className="topbar-link">
              My Bookings
            </Link>
            <button onClick={logout} className="topbar-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Topbar;
