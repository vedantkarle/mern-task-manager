const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messages");

const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/:chatId", isAuth, getMessages);
router.post("/", isAuth, sendMessage);

module.exports = router;
