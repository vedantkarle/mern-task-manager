const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const Todo = require("../models/todoModel");

exports.getTasks = async (req, res) => {
	try {
		const tasks = await Task.find().populate("todos");

		res.status(200).json(tasks);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
};

exports.getSingleTask = async (req, res) => {
	try {
		const { id: _id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		const task = await Task.findById(_id).populate("todos");

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
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

exports.updateTask = async (req, res) => {
	const { id: _id } = req.params;
	try {
		const task = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		const updatedTask = await Task.findByIdAndUpdate(_id, task, { new: true });

		res.json({ updatedTask, message: "Task updated successfully!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

exports.deleteTask = async (req, res) => {
	const { id: _id } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		await Task.findByIdAndDelete(_id);

		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

exports.addTodo = async (req, res) => {
	const { id: _id } = req.params;
	const todoBody = req.body;
	try {
		let task = await Task.findById(_id);

		const todo = await Todo.create(todoBody);

		task = await Task.findByIdAndUpdate(
			_id,
			{
				$push: { todos: todo._id },
			},
			{ new: true }
		).populate("todos");

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

exports.editTodo = async (req, res) => {
	const { todoId, taskId } = req.params;
	try {
		const newTodo = req.body;

		if (!mongoose.Types.ObjectId.isValid(todoId))
			return res.status(404).json({ message: "No todo with that id" });

		let task = await Task.findById(taskId);

		const updatedTodo = await Todo.findByIdAndUpdate(todoId, newTodo, {
			new: true,
		});

		const newTodos = task.todos.map(todo =>
			todo._id === todoId ? updatedTodo : todo
		);

		task = await Task.findByIdAndUpdate(
			taskId,
			{
				$set: { todos: newTodos },
			},
			{ new: true }
		).populate("todos");

		res.json({ task, message: "Todo updated successfully!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};

exports.deleteTodo = async (req, res) => {
	const { taskId, todoId } = req.params;

	try {
		if (!mongoose.Types.ObjectId.isValid(todoId))
			return res.status(404).json({ message: "No task with that id" });

		await Todo.findByIdAndDelete(todoId);

		let task = await Task.findById(taskId);

		const newTodos = task.todos.filter(todo => todo._id !== todoId);

		task = await Task.findByIdAndUpdate(
			taskId,
			{
				$set: { todos: newTodos },
			},
			{ new: true }
		).populate("todos");

		res.json({ task, message: "Todo deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
};
