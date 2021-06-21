const Task = require("../models/taskModel");
const mongoose = require("mongoose");

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
		const { id: _id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No post with that id" });

		const task = await Task.findById(_id);

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

exports.updateTask = async (req, res) => {
	const { id: _id } = req.params;
	try {
		const task = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No post with that id" });

		const updatedTask = await Task.findByIdAndUpdate(_id, task, { new: true });

		res.json(updatedTask);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.updateTask = async (req, res) => {
	const { id: _id } = req.params;
	try {
		const task = req.body;

		if (!mongoose.Types.ObjectId.isValid)
			return res.status(404).json({ message: "No post with that id" });

		const updatedTask = await Task.findByIdAndUpdate(_id, task, { new: true });

		res.json({ updatedTask, message: "Task updated successfully!" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.deleteTask = async (req, res) => {
	const { id: _id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid)
			return res.status(404).json({ message: "No post with that id" });

		await Task.findByIdAndDelete(_id);

		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

exports.addTodo = async (req, res) => {
	const { id: _id } = req.params;
	const todo = req.body;
	try {
		const task = await Task.findById(_id);

		task.todos.unshift(todo);

		await task.save();

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};
