import React from "react";
import "./Popup.scss";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="popup-body">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
