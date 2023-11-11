const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BirthdaySchema = new Schema({
  name: String,
  surname: String,
  country: String,
  birthday: Date,
});

module.exports = mongoose.model("birthdays", BirthdaySchema);
