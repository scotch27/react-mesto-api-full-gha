import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoToolTip from "./InfoTooltip.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [autchOk, setAutchOk] = useState(false);
  const [userData, setUserData] = useState({ email: "" });
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoToolTipOpen ||
    selectedCard.link;

  const navigate = useNavigate();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleAddPlaceSubmit(card) {
    api
      .setCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // // Отправляем запрос в API и получаем обновлённые данные карточки
    (isLiked ? api.dislikeCard(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((newArray) =>
          newArray.filter((item) => card._id !== item._id)
        );
      })
      .catch(console.error);
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error);
  }

  const handleLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setUserData({ email: email });
          setLoggedIn(true);
          navigate("/", { replace: true });
        } else {
          setAutchOk(false);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        setAutchOk(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        setAutchOk(!res.error);
        setIsInfoToolTipOpen(true);
      })
      .catch((err) => {
        setAutchOk(false);
        setIsInfoToolTipOpen(true);
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // проверим токен
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserData({ email: res.data.email });
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => {
          setAutchOk(false);
          setIsInfoToolTipOpen(true);
        });
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setUserData({});
    setLoggedIn(false);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header loggedIn={loggedIn} userData={userData} signOut={signOut} />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
              />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route
          path="/sign-up"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm title="Вы уверены?" name="placeDelete" buttonText="Да" />

      <ImagePopup card={selectedCard} isClose={closeAllPopups} />

      <InfoToolTip
        isOpen={isInfoToolTipOpen}
        onClose={closeAllPopups}
        isOk={autchOk}
        message={
          autchOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
