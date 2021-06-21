import { combineReducers } from "redux";
import modals from "./modal";
import tasks from "./tasks";

export default combineReducers({
	tasks,
	modals,
});
