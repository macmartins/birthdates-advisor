const express = require("express");
const mongoose = require("mongoose");
const birthdaysRoute = require("./routes/birthdays.js");
const countriesRoute = require("./routes/countries.js");
const authRoute = require("./routes/auth.js");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("listening");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "build")));
app.use(express.json());
app.use("/api/birthdays", birthdaysRoute);
app.use("/api/countries", countriesRoute);
app.use("/api/login", authRoute);

app.get("*/", (req, res) => {
  res.sendFile(path.join(`${__dirname}/build/index.html`));
});
