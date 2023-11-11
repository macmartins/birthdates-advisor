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

module.exports = { getBirthdays };
