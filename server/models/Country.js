const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: {
    common: String,
  },
});

module.exports = mongoose.model("countries", CountrySchema);
