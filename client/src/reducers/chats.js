const initialState = {
	chats: [],
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

		default:
			return state;
	}
};
