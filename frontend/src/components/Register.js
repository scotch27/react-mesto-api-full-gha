import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ handleRegister }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(formValue.email, formValue.password);
  };

  return (
    <div className="login">
      <h3 className="login__title">Регистрация</h3>
      <form onSubmit={handleSubmit} className="login__form">
        <label className="login__field">
          <input
            type="email"
            className="login__input"
            id="email"
            name="email"
            placeholder="email"
            required
            minLength="6"
            maxLength="30"
            onChange={handleChange}
            value={formValue.email || ""}
          />
        </label>

        <label className="login__field">
          <input
            type="password"
            className="login__input"
            id="password"
            name="password"
            placeholder="Пароль"
            required
            minLength="3"
            onChange={handleChange}
            value={formValue.password || ""}
          />
        </label>
        <button className="login__enter" type="submit">
          Зарегистрироваться
        </button>
        <p className="login__text">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="login__link">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
