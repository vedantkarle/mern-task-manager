const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const taskRoutes = require("./routes/tasks");

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/tasks", taskRoutes);

const CONNECTION_URL =
	"mongodb+srv://vedant:JVrD7HOKPNjnG0F8@cluster0.uahs1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

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
