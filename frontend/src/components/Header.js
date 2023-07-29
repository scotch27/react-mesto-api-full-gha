import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logoMesto from "../images/logo/logo_mesto.svg";

function Header({ loggedIn, userData, signOut }) {
  const [location, setLocation] = useState({ name: "", link: "" });

  const curentLocation = useLocation();

  React.useEffect(() => {
    if (loggedIn) {
      setLocation({ name: "Выйти", link: "" });
    } else if (curentLocation.pathname === "/sign-in") {
      setLocation({ name: "Регистрация", link: "/sign-up" });
    } else {
      setLocation({ name: "Войти", link: "/sign-in" });
    }
  }, [curentLocation, loggedIn, userData]);

  return (
    <header className="header">
      <img
        src={logoMesto}
        alt="Логотип места в России"
        className="header__logo"
      />

      <div className="header__wrapper">
        {userData.email && <p className="header__text">{userData.email}</p>}
        <Link
          onClick={loggedIn ? signOut : ""}
          className="header__link"
          to={location.link}
        >
          {location.name}
        </Link>
      </div>
    </header>
  );
}

export default Header;
