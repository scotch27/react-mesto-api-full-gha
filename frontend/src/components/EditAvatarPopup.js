import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarLink = React.useRef(null);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  useEffect(() => {
    avatarLink.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Обновить&nbsp;аватар"
      name="avatar"
      isOpen={isOpen}
      isClose={onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <label className="form__field">
          <input
            type="url"
            className="form__input"
            id="avatarLink"
            name="avatarLink"
            placeholder="Ссылка на картинку"
            required
            ref={avatarLink}
          />
          <span className="form__input-error avatarlink-input-error form__input-error_active" />
        </label>
      </fieldset>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
