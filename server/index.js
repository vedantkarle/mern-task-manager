const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
require("dotenv").config();

const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chats");
const messageRoutes = require("./routes/messages");

const globalErrorHandler = require("./controllers/error");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
	pingTimeout: 60000,
	cors: { origin: "http://localhost:3000" },
});

io.on("connection", socket => {
	socket.on("setup", result => {
		socket.join(result.name);
		socket.emit("connected");
	});
	socket.on("disconnect", () => {
		console.log("Dicsonnected");
	});

	socket.on("join room", room => socket.join(room));
	socket.on("typing", room => socket.in(room).emit("typing"));
	socket.on("stop typing", room => socket.in(room).emit("stop typing"));
});

app.use("/api/tasks", taskRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

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
