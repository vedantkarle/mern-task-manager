const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { setJWT, deleteJWT } = require("../redis");

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

router.get(
	"/",
	asyncHandler(async (req, res, next) => {
		try {
			const { authorization } = req.headers;
			const token = authorization.split("Bearer ")[1];

			const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);

			if (decoded.email) {
				const user = await User.findOne({ email: decoded.email });
				if (user) {
					let tokenExp = user.refreshToken.createdAt;
					const dbRefreshToken = user.refreshToken.token;

					tokenExp = tokenExp.setDate(
						tokenExp.getDate() + +process.env.JWT_EXPIRY
					);

					const today = new Date();

					if (dbRefreshToken !== token && tokenExp < today) {
						//expired
						return res.status(403).json({ message: "You must be logged in!" });
					}

					const accessJwt = await createAccessJwt(decoded.email, `${user._id}`);

					return res.status(200).json(accessJwt);
				}
			}
		} catch (error) {
			res.status(403).json({ message: "You must be logged in!" });
		}
	})
);

module.exports = router;
