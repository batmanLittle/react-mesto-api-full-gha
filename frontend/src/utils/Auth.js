// export const BASE_URL = "http://localhost:3001";
export const BASE_URL = "https://api.batman.nomoredomains.rocks";

const makeRequest = (url, method, body, token) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }
  if (token) {
    options.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  return fetch(`${BASE_URL}/${url}`, options).then((res) => {
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
};

export const authorize = (email, password) => {
  return makeRequest("signin", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
};

export const register = (email, password) => {
  return makeRequest("signup", "POST", {
    password: `${password}`,
    email: `${email}`,
  });
};

export const getUserData = (token) => {
  return makeRequest("users/me", "GET", null, token);
};

// export const BASE_URL = "http://localhost:3001";

// const checkResponse = (res) => {
//   if (res.ok) {
//     return res.json(); //если да, то возвращает полученные данные
//   }
//   return Promise.reject(`Error: ${res.status}`); //иначе возвращает ошибку
// };

// export const register = (email, password) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then((res) => checkResponse(res));
// };

// export const authorize = (email, password) => {
//   return fetch(`${BASE_URL}/signin`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   }).then((res) => checkResponse(res));
// };

// export const getUserData = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   }).then((res) => checkResponse(res));
// };
