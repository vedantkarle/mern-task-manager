const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true, maxlength: 30 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		photoUrl: { type: String },
		verified: { type: Boolean, default: false },
		refreshToken: {
			token: { type: String, maxlength: 500, default: "" },
			createdAt: { type: Date, required: true, default: Date.now() },
		},
	},
	{ timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
