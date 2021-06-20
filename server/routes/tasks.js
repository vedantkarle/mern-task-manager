const express = require("express");
const { getTasks, createTask, getSingleTask } = require("../controllers/tasks");
const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getSingleTask);
router.post("/", createTask);

module.exports = router;
