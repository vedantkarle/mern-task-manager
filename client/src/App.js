import decode from "jwt-decode";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { getTasks } from "./actions/tasks";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		if (user) {
			const result = user.result;
			const token = user.token;

			if (token) {
				const decodedToken = decode(token);
				if (decodedToken.exp * 1000 < new Date().getTime()) {
					dispatch({ type: "LOGOUT" });
					dispatch({ type: "CLEAR_ERROR" });
					history.push("/");
				}
			}

			dispatch({ type: "AUTH", data: { result, token } });

			dispatch(getTasks());
		}
	}, [dispatch]);

	return (
		<Router>
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{ style: { fontSize: "14px" } }}
			/>
			<Sidebar />
		</Router>
	);
};

export default App;
