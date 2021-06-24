const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findOne({ email: decodedData?.email });
		} else {
			decodedData = jwt.decode(token);

			req.user = await User.findOne({ email: decodedData?.email });
		}

		next();
	} catch (error) {
		res.status(403).json({ message: "You need to be logged in!" });
	}
};
