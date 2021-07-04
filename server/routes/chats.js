const express = require("express");
const { getChats, getSingleChat } = require("../controllers/chats");

const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getChats);
router.get("/:id", isAuth, getSingleChat);

module.exports = router;
