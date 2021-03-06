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

export const addMembers = (taskId, members) =>
	axios.post(`${url}/${taskId}/addMembers`, members, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const removeMember = (taskId, memberId) =>
	axios.post(`${url}/${taskId}/removeMember/${memberId}`, "", {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const getChats = () =>
	axios.get("/api/chats", {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const fetchSingleChat = id =>
	axios.get(`/api/chats/${id}`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const getMessages = chatId =>
	axios.get(`/api/messages/${chatId}`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const sendMessage = (message, chatId) =>
	axios.post(
		"/api/messages",
		{ message, chatId },
		{
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("profile")).token
				}`,
			},
		}
	);

export const getNotifications = () =>
	axios.get(`/api/notifications/`, {
		headers: {
			Authorization: `Bearer ${
				JSON.parse(localStorage.getItem("profile")).token
			}`,
		},
	});

export const login = data => axios.post("/api/user/login", data);
export const register = data => axios.post("/api/user/register", data);

export const addGoogleUserToDb = user =>
	axios.post("/api/user/addGoogleUser", user);
