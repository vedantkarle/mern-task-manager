const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
	{
		projectName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		todos: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Todo",
			},
		],
		completed: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			enum: ["In Progress", "Completed", "Not Clear", "Has To Be Discussed"],
		},
		members: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
