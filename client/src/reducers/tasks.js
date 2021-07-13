const initialState = {
	tasks: [],
	task: null,
	notifications: [],
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
				error: null,
			};
		case "END_LOADING":
			return {
				...state,
				loading: false,
				error: null,
			};
		case "FETCH_ALL":
			return {
				...state,
				tasks: payload,
				error: null,
			};
		case "FETCH_SINGLE_TASK":
			return {
				...state,
				task: payload,
				error: null,
			};
		case "UPDATE":
			return {
				...state,
				tasks: state.tasks.map(task =>
					task._id === payload.updatedTask._id ? payload.updatedTask : task
				),
				message: payload.message,
				error: null,
			};
		case "DELETE":
			return {
				...state,
				tasks: state.tasks.filter(task => task._id !== payload.id),
				message: payload.message,
				error: null,
			};
		case "CREATE":
			return {
				...state,
				tasks: [...state.tasks, payload],
				error: null,
			};
		case "ADD_TODO":
			return {
				...state,
				error: null,
			};
		case "EDIT_TODO":
			return {
				...state,
				error: null,
			};
		case "DELETE_TODO":
			return {
				...state,
				error: null,
			};
		case "FETCH_NOTIFICATIONS":
			return {
				...state,
				notifications: payload,
				error: null,
			};
		case "SET_NOTIFICATIONS":
			return {
				...state,
				notifications: [...state.notifications, payload],
				error: null,
			};
		case "SET_ERROR":
			return {
				...state,
				loading: false,
				error: payload,
				message: null,
			};
		case "CLEAR_ERROR":
			return {
				...state,
				error: null,
			};
		case "SET_MESSAGE":
			return {
				...state,
				message: payload.message,
				error: null,
			};
		default:
			return state;
	}
};
