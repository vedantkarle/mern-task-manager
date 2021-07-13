const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const Pusher = require("pusher");
require("dotenv").config();

const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chats");
const messageRoutes = require("./routes/messages");
const notificationRoutes = require("./routes/notifications");

const globalErrorHandler = require("./controllers/error");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);

const pusher = new Pusher({
	appId: "1233150",
	key: "3a0344f04d73dd86262c",
	secret: "5f168bf279d60264aca5",
	cluster: "ap2",
	useTLS: true,
});

const db = mongoose.connection;

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

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
	.then(() => {
		server.listen(PORT, () => {
			console.log(`Server Running On Port ${PORT}`);
		});
	})
	.catch(e => {
		console.error(e.message);
	});

db.once("open", () => {
	console.log("DB Connected");
	const notifications = db.collection("notifications");
	const messages = db.collection("messages");
	const changeStream1 = notifications.watch();
	const changeStream2 = messages.watch();

	changeStream1.on("change", change => {
		if (change.operationType === "insert") {
			const notificationDetails = change.fullDocument;
			pusher.trigger("notifications", "inserted", notificationDetails);
		}
	});

	changeStream2.on("change", change => {
		if (change.operationType === "insert") {
			const messageDetails = change.fullDocument;
			pusher.trigger("messages", "inserted", messageDetails);
		} else {
			console.log("Error triggering pusher");
		}
	});
});
