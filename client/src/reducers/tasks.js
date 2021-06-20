const initialState = {
	tasks: [],
	task: {},
	loading: false,
	error: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "START_LOADING":
			return {
				...state,
				loading: true,
			};
		case "END_LOADING":
			return {
				...state,
				loading: false,
			};
		case "FETCH_ALL":
			return {
				...state,
				tasks: payload,
			};
		case "FETCH_SINGLE_TASK":
			return {
				...state,
				task: payload,
			};
		case "CREATE":
			return {
				...state,
				tasks: [...state.tasks, payload],
			};
		case "SET_ERROR":
			return {
				...state,
				error: payload,
			};
		default:
			return state;
	}
};
