const express = require("express");
const { getBirthdays, createBirthday } = require("../controllers/birthdays");
const router = express.Router();

router.get("/", getBirthdays);
router.post("/", createBirthday);

module.exports = router;
