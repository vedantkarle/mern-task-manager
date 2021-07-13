import decode from "jwt-decode";
import Pusher from "pusher-js";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { getTasks } from "./actions/tasks";
import "./App.css";
import ErrorComponent from "./components/Error/ErrorComponent";
import FloatingButton from "./components/FloatingButton";
import Login from "./components/Form/Login";
import Register from "./components/Form/Register";
import ChatDetail from "./components/MainContent/Chats/ChatDetail";
import Chats from "./components/MainContent/Chats/Chats";
import Notifications from "./components/MainContent/Notifications/Notifications";
import Today from "./components/MainContent/Today/Today";
import ModalManager from "./components/Modal/ModalManager";
import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import TaskDetail from "./components/Task/TaskDetail";

const App = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const user = JSON.parse(localStorage.getItem("profile"));
	const { authData } = useSelector(state => state.auth);
	const { error, message } = useSelector(state => state.tasks);

	useEffect(() => {
		if (user) {
			const result = user.result;
			const token = user.token;

			if (token) {
				const decodedToken = decode(token);
				if (decodedToken.exp * 1000 < new Date().getTime()) {
					dispatch({ type: "LOGOUT" });
					dispatch({ type: "CLEAR_ERROR" });
					history.push("/login");
					return;
				}
			}

			dispatch({ type: "AUTH", data: { result, token } });

			dispatch(getTasks());
		}

		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
	}, [dispatch, error, message]);

	useEffect(() => {
		var pusher = new Pusher("3a0344f04d73dd86262c", {
			cluster: "ap2",
		});

		var channel = pusher.subscribe("notifications");
		channel.bind("inserted", function (data) {
			dispatch({ type: "SET_NOTIFICATIONS", payload: data });
		});
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [dispatch]);

	useEffect(() => {
		var pusher = new Pusher("3a0344f04d73dd86262c", {
			cluster: "ap2",
		});

		var channel = pusher.subscribe("messages");
		channel.bind("inserted", function (data) {
			if (
				data.sender.email !== authData?.result.email &&
				!location.pathname.includes("/chats")
			) {
			}
		});
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, []);

	const mainPageStyle = {
		left: "250px",
		marginTop: "80px",
		width: "calc(100% - 250px)",
	};

	return (
		<>
			<ModalManager />
			<Toaster
				position='bottom-right'
				reverseOrder={false}
				toastOptions={{ style: { fontSize: "14px", zIndex: 99 } }}
			/>
			{authData && <Navbar />}
			<div className='page-content' style={authData && mainPageStyle}>
				{authData && !location.pathname.includes("/chats") && (
					<FloatingButton />
				)}
				<Switch>
					<PrivateRoute path='/' component={Today} exact />
					<PrivateRoute path='/tasks/:id' component={TaskDetail} />
					<PrivateRoute path='/projects' component={Today} exact />
					<PrivateRoute path='/notifications' component={Notifications} exact />
					<PrivateRoute path='/chats/' component={Chats} exact />
					<PrivateRoute path='/chats/:id' component={ChatDetail} exact />
					<Route path='/login' component={Login} exact />
					<Route path='/register' component={Register} exact />
					<Route path='*' component={ErrorComponent} exact />
				</Switch>
			</div>
		</>
	);
};

export default App;
