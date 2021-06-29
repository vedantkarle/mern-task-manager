import { combineReducers } from "redux";
import auth from "./auth";
import chats from "./chats";
import modals from "./modal";
import tasks from "./tasks";

export default combineReducers({
	tasks,
	modals,
	auth,
	chats,
});
