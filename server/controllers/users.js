const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res) => {
	const { email, password, key } = req.body;

	try {
		if (!key) {
			return res.status(403).json({ message: "Access Forbidden!" });
		}

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
	const { name, email, password, key } = req.body;
	try {
		if (!key) {
			return res.status(403).json({ message: "Access Forbidden!" });
		}

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

exports.addGoogleUserToDb = asyncHandler(async (req, res) => {
	const { user, key } = req.body;

	try {
		if (!key) {
			return res.status(403).json({ message: "Access Forbidden!" });
		}

		const existingUser = await User.findOne({ email: user.email });

		if (existingUser) {
			return res.status(200).json({ message: "Welcome Back!" });
		}

		const newUser = await User.create(user);
		res.status(200).json({ message: "Welcome To Tasky!" });
	} catch (error) {
		res.status(404).json({ message: "Something went wrong!" });
	}
});

exports.getUsers = asyncHandler(async (req, res) => {
	var searchObj = req.query;
	try {
		if (req.query.search !== undefined) {
			searchObj = {
				$or: [
					{ name: { $regex: searchObj.search, $options: "i" } },
					{ email: { $regex: searchObj.search, $options: "i" } },
				],
			};
		}

		const users = await User.find(searchObj);

		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.updateProfile = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
		}

		const updatedUser = await user.save();

		res.json();
	} catch (error) {}
});
