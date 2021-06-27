import axios from "axios";

const url = "/api/tasks";

export const fetchTasks = () =>
	axios.get(url, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const fetchSingleTask = id =>
	axios.get(`${url}/${id}`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const createTask = data =>
	axios.post(url, data, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const updateTask = (id, updatedTask) =>
	axios.patch(`${url}/${id}`, updatedTask, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const deleteTask = id =>
	axios.delete(`${url}/${id}`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const addTodo = (id, todo) =>
	axios.post(`${url}/${id}/todo`, todo, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const editTodo = (todoId, taskId, todo) =>
	axios.patch(`${url}/${taskId}/todo/${todoId}`, todo, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const deleteTodo = (taskId, todoId) =>
	axios.delete(`${url}/${taskId}/todo/${todoId}`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const completeTodo = (todoId, taskId) =>
	axios.post(`${url}/${taskId}/todo/${todoId}/check`, "", {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const login = data =>
	axios.post("http://localhost:5000/api/user/login", data);
export const register = data =>
	axios.post("http://localhost:5000/api/user/register", data);

export const addGoogleUserToDb = user =>
	axios.post("http://localhost:5000/api/user/addGoogleUser", user);

export const addMembers = (taskId, members) =>
	axios.post(`${url}/${taskId}/addMembers`, members, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});
