const { insertBirthday, removeBirthday } = require("../controllers/birthdays");
const mongoose = require("mongoose");
const Birthday = require("../models/Birthday");
require("dotenv").config();

const testBirthday = {
  name: "Test",
  surname: "Test",
  birthday: "1998-10-20T23:00:00.000+00:00",
  country: "6550d895c186814ae1c73083",
};

describe("Birthday TestCases", () => {
  it("should connect to mongoose", async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  let newBirthday;
  it("should create a birthday", async () => {
    newBirthday = await insertBirthday(testBirthday);
    const foundObject = await Birthday.exists({ _id: newBirthday?._id });
    expect(foundObject).toBeTruthy();
  });
  it("should remove a birthday", async () => {
    const countBeforeRemoval = await Birthday.countDocuments();
    await removeBirthday(newBirthday?._id);
    const countAfterRemoval = await Birthday.countDocuments();
    expect(countAfterRemoval).toBe(countBeforeRemoval - 1);
  });
});
