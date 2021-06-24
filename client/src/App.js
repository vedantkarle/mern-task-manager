import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
	const dispatch = useDispatch();
	const { error, message } = useSelector(state => state.tasks);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
		// const token = user?.token;

		// setUser(JSON.parse(localStorage.getItem("profile")));
	}, [error, message]);

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
