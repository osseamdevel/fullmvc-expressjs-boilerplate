require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database Connect");
    app.emit("connect");
  })
  .catch(error => console.log(error));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const routes = require("./routes");
const path = require("node:path");
const helmet = require("helmet");
const lusca = require("lusca");

const { checkCsrf, checkCsrfError, middlewareGlobal } = require("./src/middlewares/middleware");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
}));

app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Protegendo de ataques CSRF
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true,
  nosniff: true,
  referrerPolicy: 'same-origin'
}));

app.use(middlewareGlobal);
app.use(checkCsrf);
app.use(routes);

app.on("connect", () => {
  app.listen("3333", () => console.log("Server running in http://localhost:3333"));
})