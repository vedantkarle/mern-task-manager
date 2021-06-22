const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("../redis");

const createAccessJwt = async (email, _id) => {
	try {
		const accessToken = await jwt.sign(
			{ email },
			process.env.JWT_ACCESS_SECRET,
			{
				expiresIn: "15m",
			}
		);

		await setJWT(accessToken, _id);

		return accessToken;
	} catch (error) {
		return error;
	}
};

const createRefreshJwt = async (email, _id) => {
	const refreshToken = await jwt.sign(
		{ email },
		process.env.JWT_REFRESH_SECRET,
		{ expiresIn: "10d" }
	);
	return refreshToken;
};

exports.register = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		if (!email || !password || !name) {
			return res.status(400).json({ message: "All fields are required!" });
		}

		const existing = await User.findOne({ email });

		if (existing) {
			return res
				.status(400)
				.json({ message: "User with that email already exists!" });
		}

		if (password.length < 8) {
			return res
				.status(400)
				.json({ message: "Password must be at least 8 characters!" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res
			.status(200)
			.json({ message: "Registration successful Please verify your account!" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({ message: "All fields are required!" });
		}

		const user = await User.findOne({ email });

		const match = await bcrypt.compare(password, user.password);

		if (!user || !match) {
			return res.status(404).json({ message: "Invalid Credentials!" });
		}

		const accessToken = await createAccessJwt(user.email, `${user._id}`);
		const refreshToken = await createRefreshJwt(user.email, `${user._id}`);

		user.refreshToken = {
			token: refreshToken,
			createdAt: Date.now(),
		};

		await user.save();

		res
			.status(200)
			.json({ message: "Login successful", accessToken, refreshToken });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.getUserProfile = async (req, res) => {
	try {
		const _id = req.userId;

		const user = await User.findById(_id).select("-password");

		res.status(200).json(user);
	} catch (error) {
		res.status(403).json({ message: error.message });
	}
};
