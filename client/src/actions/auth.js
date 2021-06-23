import * as api from "../api";

export const login = values => async dispatch => {
	try {
		dispatch({ type: "START_AUTH_LOADING" });

		api.login(values).then(res => {
			if (res.status === 200) {
				sessionStorage.setItem("accessToken", res.data.accessToken);
				localStorage.setItem(
					"tasky",
					JSON.stringify({ refreshToken: res.data.refreshToken })
				);
			}
			api.getUserData().then(res => {
				dispatch({ type: "LOGIN", payload: res.data });
				localStorage.setItem("user", JSON.stringify({ ...res?.data }));
				dispatch({ type: "AUTH_SUCCESS" });
			});
		});

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
