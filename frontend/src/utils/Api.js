class Api {
  constructor(basePath, token) {
    this._basePath = basePath;
    this._token = token;
  }
  _getHeaders() {
    return {
      "Content-type": "application/json",
      authorization: this._token,
    };
  }
  _getJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._basePath}/cards`, {
      headers: this._getHeaders(),
      credentials: "include",
    }).then(this._getJson);
  }

  createNewCard(item) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify(item),
    }).then(this._getJson);
  }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me `, {
      headers: this._getHeaders(),
      credentials: "include",
    }).then(this._getJson);
  }
  deleteCard(id) {
    return fetch(`${this._basePath}/cards/${id} `, {
      method: "DELETE",
      credentials: "include",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  createNewAvatar(data) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJson);
  }
  createNewProfile(data) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getJson);
  }
  putLike(id) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "PUT",
      credentials: "include",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  deleteLike(id) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: "include",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
}

const api = new Api("https://api.batman.nomoredomains.rocks");
export default api;
