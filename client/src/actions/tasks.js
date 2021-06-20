import * as api from "../api";

export const getTasks = () => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.fetchTasks();

		dispatch({ type: "FETCH_ALL", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({ type: "SET_ERROR", payload: error.message });
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
		dispatch({ type: "SET_ERROR", payload: error.message });
	}
};

export const fetchSingleTask = id => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		const { data } = await api.fetchSingleTask(id);

		dispatch({ type: "FETCH_SINGLE_TASK", payload: data });

		dispatch({ type: "END_LOADING" });
	} catch (error) {
		dispatch({ type: "SET_ERROR", payload: error.message });
	}
};
