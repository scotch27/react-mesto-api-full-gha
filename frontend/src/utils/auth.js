import {BASE_URL} from "./api";

class Auth {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  register(email, password) {
    return this._request(`/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    });
  }

  authorize(email, password) {
    return this._request(`/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
  }

  checkToken(token) {
    return this._request(`/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleResponse);
  }
}

// Взаимодействие с Auth
const auth = new Auth({
  baseUrl: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default auth;