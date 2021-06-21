const express = require("express");
const {
	getTasks,
	createTask,
	getSingleTask,
	updateTask,
	deleteTask,
	addTodo,
} = require("../controllers/tasks");
const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getSingleTask);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/todo", addTodo);

module.exports = router;
