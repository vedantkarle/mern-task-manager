const express = require("express");
const { getChats } = require("../controllers/chats");

const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getChats);

module.exports = router;
