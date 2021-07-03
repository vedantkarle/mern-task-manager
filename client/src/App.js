import decode from "jwt-decode";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTasks } from "./actions/tasks";
import "./App.css";
import ModalManager from "./components/Modal/ModalManager";
import Navbar from "./components/Navbar/Navbar";

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
		<>
			<ModalManager />
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{ style: { fontSize: "14px" } }}
			/>
			<Navbar />
		</>
	);
};

export default App;
