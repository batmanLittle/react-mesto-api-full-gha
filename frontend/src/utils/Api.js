class Api {
  constructor(basePath) {
    this._basePath = basePath;
  }
  _getHeaders() {
    return {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-type": "application/json",
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
    }).then(this._getJson);
  }

  createNewCard(item) {
    return fetch(`${this._basePath}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify(item),
    }).then(this._getJson);
  }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  deleteCard(id) {
    return fetch(`${this._basePath}/cards/${id} `, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  createNewAvatar(data) {
    return fetch(`${this._basePath}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getJson);
  }
  createNewProfile(data) {
    return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
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
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
  deleteLike(id) {
    return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }
}

const api = new Api(
  "http://localhost:3001"
  // "https://api.batman.nomoredomains.rocks"
);
export default api;
