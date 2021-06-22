const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const handleError = require("./errorHandler");

const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

app.use("*", (req, res, next) => {
	const error = new Error("404 Not Found");
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	handleError(err, res);
});

const CONNECTION_URL = process.env.MONGO_URI;

const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() =>
		app.listen(PORT, () => {
			console.log(`Server Running On Port ${PORT}`);
		})
	)
	.catch(e => {
		console.error(e.message);
	});

//JVrD7HOKPNjnG0F8
