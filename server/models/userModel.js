const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		id: { type: String },
		name: { type: String, required: true, maxlength: 30 },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 8 },
		verified: { type: Boolean, default: false },
	},
	{ timestamp: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
