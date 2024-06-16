import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "../components/authentication-components/auth-context";
import Topbar from "../components/topbar/topbar";
import HotelList from "../components/hotel-components/hotel-list/hotel-list";
import BookingPageWrapper from "../pages/booking-page/booking-page-wrapper";
import Login from "../components/authentication-components/login";
import Register from "../components/authentication-components/register";
import UserBookings from "../components/booking-components/user-bookings/user-bookings";
import ErrorPage from "../pages/error-page/error-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div id="root">
            <Topbar />
            <Routes>
              <Route path="/" element={<HotelList />} />
              <Route
                path="/booking/:hotelId"
                element={<BookingPageWrapper />}
              />
              <Route
                path="/login"
                element={
                  <div className="auth-container">
                    <Login />
                  </div>
                }
              />
              <Route
                path="/register"
                element={
                  <div className="auth-container">
                    <Register />
                  </div>
                }
              />

              <Route path="/user-bookings" element={<UserBookings />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
