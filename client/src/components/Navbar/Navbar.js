import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Navbar.css";
import { SidebarData } from "./SidebarData";

const Navbar = () => {
	const history = useHistory();
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);
	const { error, message } = useSelector(state => state.tasks);
	const dispatch = useDispatch();

	const user = JSON.parse(localStorage.getItem("profile"));

	const showSidebar = () => setSidebar(!sidebar);

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
		if (message) {
			toast.success(message);
		}
	}, [error, message]);

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
							<div
								className='logout'
								onClick={() => {
									dispatch({ type: "LOGOUT" });
									history.push("/login");
								}}>
								<a>
									<i class='bx bx-log-in-circle'></i>
									<span>Logout</span>
								</a>
							</div>
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Navbar;
