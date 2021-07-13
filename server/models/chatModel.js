const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		users: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			sender: {
				name: String,
				email: String,
			},
			content: { type: String, trim: true },
			chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
		},
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
