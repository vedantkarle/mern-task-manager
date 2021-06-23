const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");
const tokenRoutes = require("./routes/tokens");
const globalErrorHandler = require("./controllers/error");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);
app.use("/user", userRoutes);
app.use("/tokens", tokenRoutes);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

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
