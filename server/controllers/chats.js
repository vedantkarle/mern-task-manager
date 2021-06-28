const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");

exports.getChats = asyncHandler(async (req, res) => {
	try {
		const chats = await Chat.find();
		res.json(chats);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
