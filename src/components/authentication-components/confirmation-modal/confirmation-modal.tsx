import React from "react";
import "./confirmation-modal.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Confirmation</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onLogin}>
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
