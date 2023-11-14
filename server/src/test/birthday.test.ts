import mongoose, { HydratedDocument } from "mongoose";
import Birthday, { IBirthday } from "../models/Birthday";
import { insertBirthday, removeBirthday } from "../controllers/birthdays";
import { describe, expect, it } from "@jest/globals";
require("dotenv").config();

const testBirthday: IBirthday = {
  name: "Test",
  surname: "Test",
  birthday: "1998-10-20T23:00:00.000+00:00",
  country: "6550d895c186814ae1c73083",
};

describe("Birthday TestCases", () => {
  it("should connect to mongoose", async () => {
    await mongoose.connect(process.env.MONGO_URI ?? "");
  });

  let newBirthday: HydratedDocument<IBirthday>;
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
