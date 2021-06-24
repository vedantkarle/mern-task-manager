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
	addMembers,
} = require("../controllers/tasks");
const router = express.Router();
const { isAuth } = require("../middlewares/auth");

router.get("/", isAuth, getTasks);
router.get("/:id", isAuth, getSingleTask);
router.post("/", isAuth, createTask);
router.patch("/:id", isAuth, updateTask);
router.delete("/:id", isAuth, deleteTask);
router.post("/:id/todo", isAuth, addTodo);
router.patch("/:taskId/todo/:todoId", isAuth, editTodo);
router.delete("/:taskId/todo/:todoId", isAuth, deleteTodo);
router.post("/:id/addMembers", isAuth, addMembers);

module.exports = router;
