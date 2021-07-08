const express = require("express");
const { getNotifications } = require("../controllers/notifications");

const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getNotifications);

module.exports = router;
