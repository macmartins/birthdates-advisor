import express from "express";
import { createBirthday, getBirthdays } from "../controllers/birthdays";

const router = express.Router();
router.get("/", getBirthdays);
router.post("/", createBirthday);
export default router;
