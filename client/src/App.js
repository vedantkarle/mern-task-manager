import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
	const dispatch = useDispatch();
	const { error, message } = useSelector(state => state.tasks);
	const { isAuth } = useSelector(state => state.auth);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
		if (localStorage.getItem("user") && sessionStorage.getItem("accessToken")) {
			dispatch({
				type: "LOGIN",
				payload: { ...JSON.parse(localStorage.getItem("user")) },
			});
			dispatch({ type: "AUTH_SUCCESS" });
		}
	}, [isAuth, error, message]);

	return (
		<>
			<Toaster
				position='top-right'
				reverseOrder={false}
				toastOptions={{ style: { fontSize: "14px" } }}
			/>
			<Navbar />
			<Sidebar />
		</>
	);
};

export default App;
