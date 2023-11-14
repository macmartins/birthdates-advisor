import { Request, Response } from "express";
import Country from "../models/Country";

export const getCountries = async (req: Request, res: Response) => {
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

export const createCountry = async (req: Request, res: Response) => {
  try {
    const country = new Country(req.body.data);
    await country.save();

    return res.status(200).json({ _id: country._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error?.toString() });
  }
};

export const updateCountry = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const country = await Country.findOneAndUpdate({ _id: id }, req.body.data, {
      new: true,
    });

    return res.status(200).json({ country });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error?.toString() });
  }
};

export const deleteCountry = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Country.findOneAndDelete({ _id: id });

    return res.status(200).json({ _id: id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: error?.toString() });
  }
};
