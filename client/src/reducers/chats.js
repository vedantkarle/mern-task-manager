const initialState = {
	chats: [],
	messages: [],
	chat: null,
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "FETCH_ALL_CHATS":
			return {
				...state,
				chats: payload,
			};
		case "FETCH_SINGLE_CHAT":
			return {
				...state,
				chat: payload,
			};
		// case "SEND_MESSAGE":
		// 	return {
		// 		...state,
		// 		messages: [...state.messages, payload],
		// 	};
		case "FETCH_MESSAGES":
			return {
				...state,
				messages: payload,
			};
		default:
			return state;
	}
};
