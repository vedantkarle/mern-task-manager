const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");

exports.getMessages = asyncHandler(async (req, res) => {
	const { chatId } = req.params;
	try {
		const messages = await Message.find({ chat: chatId })
			.populate("sender")
			.populate("readBy");

		res.status(200).json(messages);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

exports.sendMessage = asyncHandler(async (req, res) => {
	try {
		if (!req.body.message || !req.body.chatId) {
			return res.status(400).json({ message: "Invalid Data Passed" });
		}

		let newMessage = await Message.create({
			sender: req.user._id,
			content: req.body.message,
			chat: req.body.chatId,
		});

		newMessage = await newMessage.populate("sender").execPopulate();
		newMessage = await newMessage.populate("chat").execPopulate();
		newMessage = await User.populate(newMessage, { path: "chat.users" });

		await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: newMessage,
		});

		res.status(201).json(newMessage);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
