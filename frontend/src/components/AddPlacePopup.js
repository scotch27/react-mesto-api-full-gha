import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangePlace(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onAddPlace( { name: name, link: link });
  }

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="place"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <label className="form__field">
          <input
            type="text"
            className="form__input"
            id="placeName"
            name="placeName"
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
            value={name || ""}
            onChange={handleChangePlace}
          />
          <span className="form__input-error placename-input-error form__input-error_active" />
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input"
            id="placeLink"
            name="placeLink"
            placeholder="Ссылка на картинку"
            required
            value={link || ""}
            onChange={handleChangeLink}
          />
          <span className="form__input-error placelink-input-error form__input-error_active" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
