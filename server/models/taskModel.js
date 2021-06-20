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
				description: {
					type: String,
					required: true,
				},
				completed: {
					type: Boolean,
					default: false,
				},
			},
		],
		completed: {
			type: Boolean,
			default: false,
		},
		members: [
			{
				id: { type: mongoose.Schema.Types.ObjectId },
				name: { type: String, required: true },
				email: { type: String, required: true },
			},
		],
		owner: { type: mongoose.Schema.Types.ObjectId },
	},
	{ timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
