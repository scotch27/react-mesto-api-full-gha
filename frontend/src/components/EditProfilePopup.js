import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <label className="form__field">
          <input
            type="text"
            className="form__input"
            id="fullname"
            name="fullname"
            placeholder="Имя"
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
            value={name || ""}
          />
          <span className="form__input-error fullname-input-error form__input-error_active" />
        </label>

        <label className="form__field">
          <input
            type="text"
            className="form__input"
            id="about"
            name="about"
            placeholder="О себе"
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeDescription}
            value={description || ""}
          />
          <span className="form__input-error about-input-error form__input-error_active" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
