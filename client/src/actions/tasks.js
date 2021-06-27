import * as api from "../api";

export const getTasks = () => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.fetchTasks();

		dispatch({ type: "FETCH_ALL", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		console.log(error);
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const createTask = values => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.createTask(values);

		console.log(data);

		dispatch({ type: "CREATE", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const fetchSingleTask = id => async dispatch => {
	try {
		dispatch({ type: "FETCH_SINGLE_TASK", payload: null });
		dispatch({ type: "START_LOADING" });

		const { data } = await api.fetchSingleTask(id);

		console.log(data);

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateTask = (id, task) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const {
			data: { updatedTask, message },
		} = await api.updateTask(id, task);

		dispatch({ type: "UPDATE", payload: { updatedTask, message } });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		console.log(error);
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteTask = id => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const {
			data: { message },
		} = await api.deleteTask(id);

		dispatch({ type: "DELETE", payload: { message, id } });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addTodoToTask = (id, todo) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.addTodo(id, todo);

		dispatch({ type: "ADD_TODO", payload: data });

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const editTodo = (taskId, todoId, todo) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.editTodo(taskId, todoId, todo);

		dispatch({ type: "EDIT_TODO", payload: data });

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data.task });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteTodo = (taskId, todoId) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const {
			data: { task, message },
		} = await api.deleteTodo(taskId, todoId);

		dispatch({ type: "DELETE_TODO", payload: { task, message } });

		dispatch({ type: "FETCH_SINGLE_TASK", payload: task });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const completeTodo = (todoId, taskId) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.completeTodo(todoId, taskId);

		dispatch({ type: "EDIT_TODO", payload: data });

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		console.log(error);
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addMembers = (taskId, members) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.addMembers(taskId, members);

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({
			type: "SET_ERROR",
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
