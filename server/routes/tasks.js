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
	completeTodo,
	removeMember,
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
router.post("/:taskId/todo/:todoId/check", isAuth, completeTodo);
router.post("/:id/addMembers", isAuth, addMembers);
router.post("/:taskId/removeMember/:memberId", isAuth, removeMember);

module.exports = router;
