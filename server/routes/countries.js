const express = require("express");
const {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/countries");
const { validate } = require("../controllers/auth");
const router = express.Router();

router.get("/", getCountries);
router.post("/", validate, createCountry);
router.put("/:id", validate, updateCountry);
router.delete("/:id", validate, deleteCountry);

module.exports = router;
