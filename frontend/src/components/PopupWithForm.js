import React from "react";

const PopupWithForm = ({
  name,
  title,
  isOpen,
  isClose,
  children,
  buttonText,
  onSubmit,
}) => {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`} id={`popup-${name}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={isClose}
        />
        <form
          name={`${name}Form`}
          id={`${name}Form`}
          className="form"
          onSubmit={onSubmit}
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="form__save-button" type="submit">
            {buttonText ? buttonText : "Сохранить"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
