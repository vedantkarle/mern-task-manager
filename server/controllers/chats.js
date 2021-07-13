const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

exports.getChats = asyncHandler(async (req, res) => {
	try {
		var chats = await Chat.find({
			users: { $elemMatch: { $eq: req.user._id } },
		})
			.populate("users")
			.sort({ updatedAt: -1 });

		res.json(chats);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.getSingleChat = asyncHandler(async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id))
			return res.status(404).json({ message: "No task with that id" });

		const chat = await Chat.findById(req.params.id).populate("users");

		if (!chat) {
			return res.status(404).json({ message: "No task with that id" });
		}

		res.json(chat);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
