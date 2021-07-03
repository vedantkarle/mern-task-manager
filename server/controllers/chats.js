const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

exports.getChats = asyncHandler(async (req, res) => {
	try {
		const chats = await Chat.find({
			users: { $elemMatch: { $eq: req.user._id } },
		}).populate("users");
		res.json(chats);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});