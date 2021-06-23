const initialState = {
	user: null,
	loading: false,
	isAuth: false,
	error: null,
	message: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "START_AUTH_LOADING":
			return {
				...state,
				loading: true,
				error: null,
			};
		case "END_AUTH_LOADING":
			return {
				...state,
				loading: false,
			};
		case "LOGIN":
			return {
				...state,
				isAuth: true,
				user: payload.user,
				message: payload.message,
			};
		case "REGISTER":
			return {
				...state,
				isAuth: true,
				user: payload,
			};
		case "SET_AUTH_ERROR":
			return {
				...state,
				loading: false,
				error: payload,
			};
		default:
			return state;
	}
};
