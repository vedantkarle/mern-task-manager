const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		id: { type: String },
		name: { type: String, required: true, maxlength: 30 },
		email: { type: String, required: true, unique: true },
		password: { type: String, minlength: 8 },
		verified: { type: Boolean, default: false },
		userType: { type: String, enum: ["google", "normal"], default: "normal" },
	},
	{ timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
