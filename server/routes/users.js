const express = require("express");
const { register, login, getUserProfile } = require("../controllers/users");
const router = express.Router();
const { isAuthorized } = require("../middlewares/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/:id", isAuthorized, getUserProfile);

module.exports = router;
