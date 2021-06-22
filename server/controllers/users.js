const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccessJwt = async payload => {
	const accessToken = await jwt.sign(
		{ payload },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: "15m" }
	);
	return accessToken;
};

const createRefreshJwt = async payload => {
	const refreshToken = await jwt.sign(
		{ payload },
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

		const accessToken = await createAccessJwt(user.email);
		const refreshToken = await createRefreshJwt(user.email);

		res
			.status(200)
			.json({ message: "Login successful", accessToken, refreshToken });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
