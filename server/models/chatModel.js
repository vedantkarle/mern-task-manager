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
		latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
	},
	{ timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
