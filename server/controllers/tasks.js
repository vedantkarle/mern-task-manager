const Task = require("../models/taskModel");

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find();

		res.status(200).json(tasks);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.getSingleTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id);

		res.status(200).json(task);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

exports.createTask = async (req, res) => {
	const task = req.body;

	try {
		const newTask = await Task.create(task);

		res.status(201).json(newTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};
