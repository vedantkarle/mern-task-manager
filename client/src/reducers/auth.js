export default (state = { authData: null }, { type, data }) => {
	switch (type) {
		case "AUTH":
			localStorage.setItem("profile", JSON.stringify({ ...data }));
			return { ...state, authData: data };
		case "LOGOUT":
			localStorage.clear();
			return { ...state, authData: null };
		default:
			return state;
	}
};
