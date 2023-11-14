import express from "express";
import {
  createCountry,
  deleteCountry,
  getCountries,
  updateCountry,
} from "../controllers/countries";
import { validate } from "../controllers/auth";

const router = express.Router();

router.get("/", getCountries);
router.post("/", validate, createCountry);
router.put("/:id", validate, updateCountry);
router.delete("/:id", validate, deleteCountry);

export default router;
