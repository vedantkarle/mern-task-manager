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
const { isAuthorized } = require("../middlewares/auth");

router.get("/", isAuthorized, getTasks);
router.get("/:id", isAuthorized, getSingleTask);
router.post("/", isAuthorized, createTask);
router.patch("/:id", isAuthorized, updateTask);
router.delete("/:id", isAuthorized, deleteTask);
router.post("/:id/todo", isAuthorized, addTodo);
router.patch("/:taskId/todo/:todoId", isAuthorized, editTodo);
router.delete("/:taskId/todo/:todoId", isAuthorized, deleteTodo);

module.exports = router;
