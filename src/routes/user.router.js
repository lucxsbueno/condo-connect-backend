const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/checkToken");
const {
  findAllUsers,
  findUserById,
  deleteUserById,
  updateUserById,
  signin,
  signup,
} = require("../controllers/user.controller");

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/", checkToken, findAllUsers);
router.get("/:id", checkToken, findUserById);
router.delete("/:id", checkToken, deleteUserById);
router.put("/:id", checkToken, updateUserById);

module.exports = router;
