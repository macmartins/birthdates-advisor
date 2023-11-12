const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    common: String,
  },
});

module.exports = mongoose.model("countries", CountrySchema);
