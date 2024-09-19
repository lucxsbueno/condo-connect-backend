const express = require("express");
const router = express.Router();
const init = require("../controllers/index.controller");

router.get("/", init);

module.exports = router;
