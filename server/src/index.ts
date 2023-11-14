import express from "express";
import mongoose from "mongoose";
import birthdaysRoute from "./routes/birthdays";
import countriesRoute from "./routes/countries";
import authRoute from "./routes/auth";
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
mongoose
  .connect(process.env.MONGO_URI ?? "")
  .then(() => {
    console.log("listening");
    app.listen(PORT);
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/birthdays", birthdaysRoute);
app.use("/api/countries", countriesRoute);
app.use("/api/login", authRoute);
