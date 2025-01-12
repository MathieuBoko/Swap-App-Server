const express = require("express");

const {
  postDataToDatabase,
  fetchDatabaseData,
} = require("../controllers/swapsController");

const router = express.Router();

router.post("/formData", postDataToDatabase);
router.get("/dbData", fetchDatabaseData);

module.exports = router;
