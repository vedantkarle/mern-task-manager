import React, { useState } from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import ErrorComponent from "../Error/ErrorComponent";
import Login from "../Form/Login";
import Register from "../Form/Register";
import Chats from "../MainContent/Chats/Chats";
import Today from "../MainContent/Today/Today";
import PrivateRoute from "../PrivateRoute";
import TaskDetail from "../Task/TaskDetail";
import "./Navbar.css";
import { SidebarData } from "./SidebarData";

const Navbar = () => {
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<div className='navbar'>
				<Link to='#' className='menu-bars'>
					<h4>TASKY</h4>
				</Link>
			</div>
			<div className='main'>
				<div>
					<nav className={sidebar ? "nav-menu active" : "nav-menu"}>
						<ul className='nav-menu-items' onClick={showSidebar}>
							{SidebarData.map((data, index) => {
								return (
									<li
										key={index}
										className={`nav-text ${
											location.pathname === data.path ? "active" : ""
										}`}>
										<Link to={data.path}>
											<i className={data.icon}></i>
											<span>{data.title}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
				<div className='page-content'>
					<Switch>
						<PrivateRoute path='/' component={Today} exact />
						<PrivateRoute path='/tasks/:id' component={TaskDetail} />
						<PrivateRoute path='/projects' component={Today} exact />
						<PrivateRoute path='/chats' component={Chats} exact />
						<Route path='/login' component={Login} exact />
						<Route path='/register' component={Register} exact />
						<Route path='*' component={ErrorComponent} exact />
					</Switch>
				</div>
			</div>
		</>
	);
};

export default Navbar;
