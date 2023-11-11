const express = require("express");
const { getBirthdays } = require("../controllers/birthdays");
const router = express.Router();

router.get("/", getBirthdays);

module.exports = router;
