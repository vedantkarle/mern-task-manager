const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

exports.getNotifications = asyncHandler(async (req, res) => {
	try {
		const notifications = await Notification.find({
			"userTo.email": req.user.email,
		}).sort({ createdAt: -1 });

		res.status(200).json(notifications);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

exports.markOpened = asyncHandler(async (req, res) => {
	try {
		await Notification.findByIdAndUpdate(req.params.id, { opened: true });
		res.sendStatus(204);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

exports.markAllOpened = asyncHandler(async (req, res) => {
	try {
		await Notification.updateMany(
			{ userTo: { email: req.user.email } },
			{ opened: true }
		);
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});
