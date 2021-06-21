const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
	description: {
		type: String,
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
