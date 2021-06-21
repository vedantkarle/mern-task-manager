const initialState = {
	tasks: [],
	task: null,
	loading: false,
	error: null,
	message: null,
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
		case "UPDATE":
			return {
				...state,
				tasks: state.tasks.map(task =>
					task._id === payload.updatedTask._id ? payload.updatedTask : task
				),
				message: payload.message,
			};
		case "DELETE":
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== payload.id),
				message: payload.message,
			};
		case "CREATE":
			return {
				...state,
				tasks: [...state.tasks, payload],
			};
		case "ADD_TODO":
			return {
				...state,
				tasks: state.tasks.map(task =>
					task._id === payload._id ? payload : task
				),
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
