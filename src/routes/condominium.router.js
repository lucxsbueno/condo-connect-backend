const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/checkToken");
const {
  findAllCondominiums,
  createNewCondominium
} = require("../controllers/condominium.controller");

router.get("/", checkToken, findAllCondominiums);
router.post("/", checkToken, createNewCondominium);

module.exports = router;
