const handleError = (err, res) => {
	console.log(err);
	res.status(err.status || 500).json({ message: err.message });
};

module.exports = handleError;
