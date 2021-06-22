const jwt = require("jsonwebtoken");
const { getJWT, deleteJWT } = require("../redis");

exports.isAuthorized = async (req, res, next) => {
	try {
		const { authorization } = req.headers;
		const token = authorization.split("Bearer ")[1];

		const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

		if (decoded.email) {
			const userId = await getJWT(token);

			if (!userId) {
				return res.status(403).json({ message: "You must be logged in!" });
			}

			req.userId = userId;

			next();
		}

		deleteJWT(token);
	} catch (error) {
		res.status(403).json({ message: "You must be logged in!" });
	}
};
