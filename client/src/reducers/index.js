import { combineReducers } from "redux";
import auth from "./auth";
import modals from "./modal";
import tasks from "./tasks";

export default combineReducers({
	tasks,
	modals,
	auth,
});
