const jwt = require("jsonwebtoken");

exports.isAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		const isCustomAuth = token.length < 500;

		let decodedData;

		if (token && isCustomAuth) {
			decodedData = jwt.verify(token, process.env.JWT_SECRET);

			req.userId = decodedData?.id;
		} else {
			decodedData = jwt.decode(token);

			req.userId = decodedData?.sub;
		}

		next();
	} catch (error) {
		res.status(403).json({ message: "You need to be logged in!" });
	}
};
