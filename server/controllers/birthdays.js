const Birthday = require("../models/Birthday");

const getBirthdays = async (req, res) => {
  await Birthday.find()
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

const insertBirthday = async (birthdayObj) => {
  const birthday = new Birthday(birthdayObj);
  await birthday.save();
  return birthday;
};

const removeBirthday = async (id) => {
  await Birthday.findOneAndDelete({ _id: id });
};

const createBirthday = async (req, res) => {
  try {
    const birthday = await insertBirthday();
    res.status(200).json({ _id: birthday._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getBirthdays,
  createBirthday,
  insertBirthday,
  removeBirthday,
};
