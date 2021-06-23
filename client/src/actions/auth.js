import * as api from "../api";

export const login = values => async dispatch => {
	try {
		dispatch({ type: "START_AUTH_LOADING" });

		const res = await api.login(values);

		if (res.status === 200) {
			sessionStorage.setItem("accessToken", res.data.accessToken);
			localStorage.setItem(
				"tasky",
				JSON.stringify({ refreshToken: res.data.refreshToken })
			);
		}

		const userRes = await api.getUserData();

		console.log(userRes);

		dispatch({ type: "END_AUTH_LOADING" });
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
