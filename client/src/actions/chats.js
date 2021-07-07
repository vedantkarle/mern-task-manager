import * as api from "../api";

export const getAllChats = () => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });
		const { data } = await api.getChats();

		dispatch({ type: "FETCH_ALL_CHATS", payload: data });
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

export const fetchSingleChat = id => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });
		const { data } = await api.fetchSingleChat(id);

		dispatch({ type: "FETCH_SINGLE_CHAT", payload: data });

		const res = await api.getMessages(id);

		dispatch({ type: "FETCH_MESSAGES", payload: res.data });

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

export const sendMessage = (message, chatId) => async dispatch => {
	try {
		dispatch({ type: "START_LOADING" });

		await api.sendMessage(message, chatId);

		const { data } = await api.getMessages(chatId);

		dispatch({ type: "FETCH_MESSAGES", payload: data });
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
