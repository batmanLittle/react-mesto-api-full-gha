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
