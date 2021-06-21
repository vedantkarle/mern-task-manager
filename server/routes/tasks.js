const express = require("express");
const {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
	addTodo,
	editTodo,
	deleteTodo,
} = require("../controllers/tasks");
const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getSingleTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/todo", addTodo);
router.patch("/:taskId/todo/:todoId", editTodo);
router.delete("/:taskId/todo/:todoId", deleteTodo);

module.exports = router;
