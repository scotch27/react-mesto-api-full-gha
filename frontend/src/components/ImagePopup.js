import React from "react";

const ImagePopup = ({ card, isClose }) => {
  return (
    <div className={`popup overlay ${card.link !=='' && "popup_opened"}`} id="popup-image">
      <div className="popup__container-image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={isClose}
        />
        <figure className="popup__image">
          <img className="popup__picture" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;
