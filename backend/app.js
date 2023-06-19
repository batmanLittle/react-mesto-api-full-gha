require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const errorPath = require("./utils/errorPath");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { createUserValid, loginValid } = require("./middlewares/validation");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
// const cors = require("cors");
const app = express();

// app.use(
//   cors({
//     origin: "*",
//     credentials: true,
//   })
// );
// app.options("*", cors());

const { PORT = 3000 } = process.env;

const allowedCors = [
  "https://batman.nomoredomains.rocks",
  "http://batman.nomoredomains.rocks",
  "localhost:3000",
  "http://localhost:3000",
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  res.header("Access-Control-Allow-Credentials", "true");
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);

    return res.end();
  }

  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/mestodb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.post("/signin", loginValid, login);
app.post("/signup", createUserValid, createUser);

app.use(auth, userRouter);
app.use(auth, cardRouter);

app.use("/*", auth, errorPath);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log("App listening on server 3000");
  // console.log(process.env.NODE_ENV);
});
