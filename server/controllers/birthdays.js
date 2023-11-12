const Birthday = require("../models/Birthday");

const getBirthdays = async (req, res) => {
  await Birthday.find()
    .then(async (result) => {
      const count = await Birthday.countDocuments();
      res.status(200).json({
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: error });
    });
};

const createBirthday = async (req, res) => {
  try {
    const birthday = new Birthday(req.body.data);
    birthday.save();
    res.status(200).json({ _id: birthday._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = { getBirthdays, createBirthday };
