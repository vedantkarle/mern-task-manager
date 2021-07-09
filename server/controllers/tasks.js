const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const Todo = require("../models/todoModel");
const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const Notification = require("../models/notificationModel");

exports.getTasks = asyncHandler(async (req, res) => {
	try {
		const tasks = await Task.find({
			$or: [{ owner: req.user?._id }, { members: { $in: [req.user?._id] } }],
		})
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.status(200).json(tasks);
	} catch (error) {
		console.log(error);
		res.status(404).json({ message: error.message });
	}
});

exports.getSingleTask = asyncHandler(async (req, res) => {
	try {
		const { id: _id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		const task = await Task.findById(_id)
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.status(200).json(task);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
});

exports.createTask = asyncHandler(async (req, res) => {
	const task = req.body;

	try {
		const existingTask = await Task.findOne({ projectName: task.projectName });

		if (existingTask) {
			return res
				.status(400)
				.json({ message: "Task with that name already exists" });
		}

		if (
			new Date(task.startDate).getTime() < new Date().getTime() ||
			new Date(task.endDate).getTime() < new Date().getTime() ||
			new Date(task.endDate).getTime() < new Date(task.startDate).getTime()
		) {
			return res.status(400).json({ message: "Choose correct dates" });
		}

		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		const newTask = await Task.create({ ...task, owner: req.user._id });

		newTask.members.push(req.user._id);

		await newTask.save();

		await Chat.create({
			chatName: newTask.projectName,
			users: [req.user],
		});

		res.status(201).json(newTask);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.updateTask = asyncHandler(async (req, res) => {
	const { id: _id } = req.params;
	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		const task = req.body;

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		if (
			new Date(task.startDate).getTime() < new Date().getTime() ||
			new Date(task.endDate).getTime() < new Date().getTime() ||
			new Date(task.endDate).getTime() < new Date(task.startDate).getTime()
		) {
			return res.status(400).json({ message: "Choose correct dates" });
		}

		const updatedTask = await Task.findByIdAndUpdate(_id, task, { new: true })
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.json({ updatedTask, message: "Task updated successfully!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.deleteTask = asyncHandler(async (req, res) => {
	const { id: _id } = req.params;

	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		if (!mongoose.Types.ObjectId.isValid(_id))
			return res.status(404).json({ message: "No task with that id" });

		const task = await Task.findByIdAndDelete(_id);

		await Chat.findOneAndDelete({ chatName: task.projectName });

		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.addTodo = asyncHandler(async (req, res) => {
	const { id: _id } = req.params;
	const todoBody = req.body;
	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		let task = await Task.findById(_id);

		const todo = await Todo.create(todoBody);

		task = await Task.findByIdAndUpdate(
			_id,
			{
				$push: { todos: todo._id },
			},
			{ new: true }
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		if (task.members.length > 0) {
			task.members.forEach(async member => {
				if (member.email !== req.user.email) {
					await Notification.insertNotification(
						{
							name: member.name,
							email: member.email,
							photoUrl: member.photoUrl,
						},
						{
							name: req.user.name,
							email: req.user.email,
							photoUrl: req.user.photoUrl,
						},
						"todo",
						task._id
					);
				}
			});
		}

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.editTodo = asyncHandler(async (req, res) => {
	const { todoId, taskId } = req.params;
	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

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
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.json({ task, message: "Todo updated successfully!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.completeTodo = asyncHandler(async (req, res) => {
	const { taskId, todoId } = req.params;
	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		if (!mongoose.Types.ObjectId.isValid(todoId))
			return res.status(404).json({ message: "No todo with that id" });

		let task = await Task.findById(taskId);

		let todo = await Todo.findById(todoId);

		const completed = todo.completed;

		const updatedTodo = await Todo.findByIdAndUpdate(
			todoId,
			{ completed: !completed },
			{
				new: true,
			}
		);

		const newTodos = task.todos.map(todo =>
			todo._id === todoId ? updatedTodo : todo
		);

		task = await Task.findByIdAndUpdate(
			taskId,
			{
				$set: { todos: newTodos },
			},
			{ new: true }
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.deleteTodo = asyncHandler(async (req, res) => {
	const { taskId, todoId } = req.params;

	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

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
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.json({ task, message: "Todo deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.addMembers = asyncHandler(async (req, res) => {
	const { id } = req.params;
	try {
		const members = req.body;

		let task = await Task.findById(id);

		task = await Task.findByIdAndUpdate(
			id,
			{
				$push: { members: members },
			},
			{ new: true }
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		await Chat.findOneAndUpdate(
			{ chatName: task.projectName },
			{
				$push: { users: members },
			},
			{ new: true }
		);

		members.forEach(async member => {
			await Notification.insertNotification(
				{
					name: member.name,
					email: member.email,
					photoUrl: member.photoUrl,
				},
				{
					name: req.user.name,
					email: req.user.email,
					photoUrl: req.user.photoUrl,
				},
				"member",
				task._id
			);
		});

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});

exports.removeMember = asyncHandler(async (req, res) => {
	const { taskId, memberId } = req.params;
	try {
		if (!req.user) return res.status(403).json({ message: "Unauthorized!" });

		if (!mongoose.Types.ObjectId.isValid(taskId))
			return res.status(404).json({ message: "No task with that id" });

		let task = await Task.findById(taskId);

		const newMembers = task.members.filter(
			member => member._id.toString() !== memberId.toString()
		);

		task = await Task.findByIdAndUpdate(
			taskId,
			{
				$set: { members: newMembers },
			},
			{ new: true }
		)
			.populate("owner")
			.populate("todos")
			.populate("members");

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error.message });
	}
});
