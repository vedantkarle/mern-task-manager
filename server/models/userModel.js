const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true.valueOf, unique: true },
		password: { type: String, required: true },
		photoUrl: { type: String },
	},
	{ timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
