const express = require("express");
const {
	getNotifications,
	markOpened,
	markAllOpened,
} = require("../controllers/notifications");

const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getNotifications);
router.put("/:id/markAsOpened", isAuth, markOpened);
router.put("/markAsOpened", isAuth, markAllOpened);

module.exports = router;
