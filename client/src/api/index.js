import axios from "axios";

const url = "/api/tasks";

export const fetchTasks = () =>
	axios.get(url, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const fetchSingleTask = id =>
	axios.get(`${url}/${id}`, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const createTask = data =>
	axios.post(url, data, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const updateTask = (id, updatedTask) =>
	axios.patch(`${url}/${id}`, updatedTask, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const deleteTask = id =>
	axios.delete(`${url}/${id}`, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const addTodo = (id, todo) =>
	axios.post(`${url}/${id}/todo`, todo, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const editTodo = (todoId, taskId, todo) =>
	axios.patch(`${url}/${taskId}/todo/${todoId}`, todo, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const deleteTodo = (taskId, todoId) =>
	axios.delete(`${url}/${taskId}/todo/${todoId}`, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const login = data =>
	axios.post("http://localhost:5000/api/user/login", data, {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});

export const getUserData = token =>
	axios.get("http://localhost:5000/api/user", {
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
		},
	});
