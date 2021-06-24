const express = require("express");
const {
	login,
	register,
	addGoogleUserToDb,
	getUsers,
} = require("../controllers/users");
const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.post("/login", login);
router.post("/register", register);
router.post("/addGoogleUser", addGoogleUserToDb);
router.get("/search", isAuth, getUsers);

module.exports = router;
