class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return this._request(`/cards`, { headers: this._headers });
  }

  setCard(data) {
    return this._request(`/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(`/users/me`, { headers: this._headers });
  }

  setUserInfo(userInfo) {
    return this._request(`/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    });
  }

  setAvatar(avatarLink) {
    return this._request(`/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    });
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._handleResponse);
  }
}

// Взаимодействие с API
// const api = new Api({
//   baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
//   headers: {
//     authorization: "773b24e9-0eee-4683-86ca-3d3c2a4eb53a",
//     "Content-Type": "application/json",
//   },
// });

const api = new Api({
  baseUrl: "https://mesto-back.nomoredomains.sbs",
});
export default api;
