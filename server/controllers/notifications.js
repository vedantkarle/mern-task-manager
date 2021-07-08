const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Notification = require("../models/notificationModel");

exports.getNotifications = asyncHandler(async (req, res) => {
	try {
		const notifications = await Notification.find({ userTo: req.user._id })
			.populate("userTo")
			.populate("userFrom")
			.sort({ createdAt: -1 });

		res.status(200).json(notifications);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
