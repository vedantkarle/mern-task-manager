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
				user: {
					id: payload._id,
					name: payload.name,
					email: payload.email,
					verified: payload.verified,
				},
			};
		case "AUTH_SUCCESS":
			return {
				...state,
				isAuth: true,
			};
		case "REGISTER":
			return {
				...state,
				user: {
					id: payload._id,
					name: payload.name,
					email: payload.email,
					verified: payload.verified,
				},
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
