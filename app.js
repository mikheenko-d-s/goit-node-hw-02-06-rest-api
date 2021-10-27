const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const boolParser = require("express-query-boolean");
const helmet = require("helmet");

const usersRouter = require("./src/routes/users/users");
const contactsRouter = require("./src/routes/contacts/contacts");

const { Limit } = require("./config/constants");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limit.JSON }));
app.use(boolParser());

app.use((req, _res, next) => {
  app.set("lang", req.acceptsLanguages(["ru", "en"]));
  next();
});

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
