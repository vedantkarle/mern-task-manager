import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import { Card, Divider, Image } from "semantic-ui-react";
import Home from "../../screens/Home";
import ErrorComponent from "../Error/ErrorComponent";
import FloatingButton from "../FloatingButton";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Chats from "../MainContent/Chats/Chats";
import ModalManager from "../Modal/ModalManager";
import PrivateRoute from "../PrivateRoute";
import TaskDetail from "../TaskOverview/TaskDetail";
import "./Sidebar.css";

const Sidebar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [active, setActive] = useState("today");
	const { error, message } = useSelector(state => state.tasks);

	const user = JSON.parse(localStorage.getItem("profile"));

	const logout = () => {
		dispatch({ type: "LOGOUT" });
		dispatch({ type: "CLEAR_ERROR" });
		history.push("/");
	};

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
	}, [error, message]);

	return (
		<div className='main'>
			<ModalManager />
			<div className='sidebar'>
				<h2
					as={Link}
					to='/'
					style={{
						backgroundColor: "#262626",
						textAlign: "center",
						color: "#fff",
						padding: "20px",
					}}>
					Tasky
				</h2>
				<ul>
					<li>
						<Link
							name='today'
							to='/'
							className={active === "today" ? "active" : ""}
							onClick={() => setActive("today")}>
							<i className='far fa-calendar-check'></i>
							<span>TODAY</span>
						</Link>
					</li>
					<li>
						<Link
							name='projects'
							to='/projects'
							className={active === "projects" ? "active" : ""}
							onClick={() => setActive("projects")}>
							<i className='far fa-list-alt'></i>
							<span>PROJECTS</span>
						</Link>
					</li>
					<li>
						<Link
							name='chats'
							to='/chats'
							className={active === "chats" ? "active" : ""}
							onClick={() => setActive("chats")}>
							<i className='far fa-comments'></i>
							<span>CHATS</span>
						</Link>
					</li>
					<li>
						<Link
							name='reports'
							to='/reports'
							className={active === "reports" ? "active" : ""}
							onClick={() => setActive("reports")}>
							<i className='far fa-chart-bar'></i>
							<span>REPORTS</span>
						</Link>
					</li>
					<li>
						<Link name='logout' onClick={logout}>
							<i className='far fa-window-close'></i>
							<span>LOGOUT</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className='page-content'>
				<div className='main-page-content'>
					{user && <FloatingButton />}
					<Switch>
						<PrivateRoute path='/' component={Home} exact />
						<PrivateRoute path='/projects' component={Home} exact />
						<PrivateRoute path='/chats' component={Chats} exact />
						<PrivateRoute path='/tasks/:id' component={TaskDetail} exact />
						<PrivateRoute path='/error' component={ErrorComponent} exact />
						<Route path='/login' component={Login} exact />
						<Route path='/register' component={Register} exact />
						<Route path='*' component={ErrorComponent} exact />
					</Switch>
				</div>
			</div>
			{user && (
				<div>
					<Card style={{ borderRadius: "10px", margin: "10px" }}>
						<Card.Content>
							<Card.Header
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<Image
									size='small'
									src={
										user?.result?.imageUrl != null
											? user?.result?.imageUrl
											: "https://react.semantic-ui.com/images/avatar/large/matthew.png"
									}
									circular
								/>
								<h3>Hello,{user?.result?.name}</h3>
							</Card.Header>
							<Divider />
							<Card.Description>
								Matthew is a musician living in Nashville.
							</Card.Description>
						</Card.Content>
					</Card>
				</div>
			)}
		</div>
	);
};

export default Sidebar;
