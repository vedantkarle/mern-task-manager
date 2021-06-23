const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

const setJWT = async (key, value) => {
	try {
		client.set(key, value, (err, result) => {
			if (err) return err;
			console.log(result);
			return result;
		});
	} catch (error) {
		return error;
	}
};

const getJWT = async key => {
	return new Promise((resolve, reject) => {
		try {
			client.get(key, (err, result) => {
				if (err) reject(err);
				console.log(result);
				resolve(result);
			});
		} catch (error) {
			reject(error);
		}
	});
};

const deleteJWT = async key => {
	try {
		client.del(key);
	} catch (error) {
		console.log(error);
		return error;
	}
};

module.exports = {
	setJWT,
	getJWT,
	deleteJWT,
};
