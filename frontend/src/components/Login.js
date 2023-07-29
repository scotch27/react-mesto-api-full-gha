import React, { useState } from "react";

const Login = ({ handleLogin }) => {
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
    if (!formValue.email || !formValue.password) {
      return;
    }
    handleLogin(formValue.email, formValue.password);
  };

  return (
    <div className="login">
      <h3 className="login__title">Вход</h3>
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
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
