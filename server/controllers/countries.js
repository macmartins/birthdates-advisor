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
      console.error(error);
      res.status(500).json({ msg: error.toString() });
    });
};

const createCountry = async (req, res) => {
  try {
    const country = new Country(req.body.data);
    await country.save();

    return res.status(200).json({ _id: country._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.toString() });
  }
};

const updateCountry = async (req, res) => {
  try {
    const id = req.params.id;
    const country = await Country.findOneAndUpdate({ _id: id }, req.body.data, {
      new: true,
    });

    return res.status(200).json({ country });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.toString() });
  }
};

const deleteCountry = async (req, res) => {
  try {
    const id = req.params.id;
    await Country.findOneAndDelete({ _id: id });

    return res.status(200).json({ _id: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error.toString() });
  }
};

module.exports = { getCountries, createCountry, updateCountry, deleteCountry };
