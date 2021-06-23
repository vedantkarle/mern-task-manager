import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
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
	});

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
