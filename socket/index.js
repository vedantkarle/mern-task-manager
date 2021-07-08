const io = require("socket.io")(5500, {
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", socket => {
	socket.on("join room", room => socket.join(room));

	socket.on("new message", newMessage => {
		socket.in(chat._id).emit("message received", newMessage);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected");
	});
});
