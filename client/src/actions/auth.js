import * as api from "../api";

export const login = (values, history) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });
		const { data } = await api.login({
			...values,
			key: process.env.REACT_APP_API_KEY,
		});

		dispatch({ type: "AUTH", data });
		dispatch({ type: "END_LOADING" });
		history.push("/");
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

export const register = (values, history) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });
		const { data } = await api.register({
			...values,
			key: process.env.REACT_APP_API_KEY,
		});

		dispatch({ type: "AUTH", data });
		dispatch({ type: "END_LOADING" });
		history.push("/");
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

export const addGoogleUser = user => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });
		const { data } = await api.addGoogleUserToDb({
			...user,
			key: process.env.REACT_APP_API_KEY,
		});
		console.log(data);
		dispatch({ type: "SET_MESSAGE", payload: data });
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
