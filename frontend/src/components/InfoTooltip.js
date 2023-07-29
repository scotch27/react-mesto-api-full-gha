import React from "react";
import good from "../images/symbols/good.svg";
import bad from "../images/symbols/bad.svg";
import { useLocation, useNavigate } from "react-router-dom";

const InfoToolTip = ({ onClose, isOpen, isOk, message }) => {
  const navigate = useNavigate();
  const curentLocation = useLocation();

  const closePopup = () => {
    onClose();
    if (isOk && curentLocation.pathname === "/sign-up") {
      navigate("/sign-in");
    }
  };

  return (
    <div className={`popup ${isOpen && "popup_opened"}`} id="popup-info">
      <div className="popup__container-image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={closePopup}
        />
        <div className="popup__container">
          <img className="popup__icon" src={isOk ? good : bad} alt={message} />
          <p className="popup__text">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoToolTip;
