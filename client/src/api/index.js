import axios from "axios";

const url = "http://localhost:5000/tasks";

export const fetchTasks = () => axios.get(url);

export const fetchSingleTask = id => axios.get(`${url}/${id}`);

export const createTask = data => axios.post(url, data);

export const updateTask = (id, updatedTask) =>
	axios.patch(`${url}/${id}`, updatedTask);

export const deleteTask = id => axios.delete(`${url}/${id}`);

export const addTodo = (id, todo) => axios.post(`${url}/${id}/todo`, todo);
