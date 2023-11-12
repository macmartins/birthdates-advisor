const Country = require("../models/Country");

const getCountries = async (req, res) => {
  await Country.find({})
    .select("name.common")
    .then(async (result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: error });
    });
};

module.exports = { getCountries };
