import { Request, Response } from "express";
import Birthday, { IBirthday } from "../models/Birthday";
import { Types } from "mongoose";

export const getBirthdays = async (req: Request, res: Response) => {
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

export const insertBirthday = async (birthdayObj: IBirthday) => {
  const birthday = new Birthday(birthdayObj);
  await birthday.save();
  return birthday;
};

export const removeBirthday = async (id?: Types.ObjectId) => {
  await Birthday.findOneAndDelete({ _id: id });
};

export const createBirthday = async (req: Request, res: Response) => {
  try {
    const birthday = await insertBirthday(req.body.data);
    res.status(200).json({ _id: birthday._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};
