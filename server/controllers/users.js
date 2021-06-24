const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(404).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });

		if (!existingUser)
			return res.status(404).json({ message: "Invalid Credentials" });

		const match = await bcrypt.compare(password, existingUser.password);

		if (!match) {
			return res.status(400).json({ message: "Invalid Credentials" });
		}

		const token = jwt.sign(
			{ email: existingUser.email, id: existingUser._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRY }
		);

		res.status(200).json({ result: existingUser, token });
	} catch (error) {
		res.status(404).json({ message: "Invalid Credentials" });
	}
});

exports.register = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!name.trim() || !email.trim() || !password.trim()) {
			return res.status(404).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });

		if (existingUser)
			return res.status(400).json({ message: "User already exists" });

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		const token = jwt.sign(
			{ email: user.email, id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRY }
		);

		res.status(200).json({ result: user, token });
	} catch (error) {
		res.status(404).json({ message: "Something went wrong!" });
	}
};
