import React from "react";
import { useNavigate } from "react-router-dom";
import "./authentication-warning-modal.css";

interface AuthenticationWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthenticationWarningModal: React.FC<AuthenticationWarningModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Authentication Required</h3>
        <p>
          You need to be logged in to make a booking. Please log in to continue.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationWarningModal;
