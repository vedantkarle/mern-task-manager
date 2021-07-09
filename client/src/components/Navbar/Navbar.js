import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Image } from "semantic-ui-react";
import "./Navbar.css";
import { SidebarData } from "./SidebarData";

const Navbar = () => {
	const history = useHistory();
	const location = useLocation();
	const [sidebar, setSidebar] = useState(false);
	const dispatch = useDispatch();

	const { authData } = useSelector(state => state.auth);
	const { notifications } = useSelector(state => state.tasks);

	const showSidebar = () => setSidebar(!sidebar);

	const unreadNotifications = notifications?.filter(
		notification => notification.opened === false
	);

	console.log(unreadNotifications);

	return (
		<>
			<div className='navbar'>
				<Link to='#'>
					<div className='title'>
						<i class='bx bx-task'></i>
						<span>TASKY</span>
					</div>
				</Link>
				<Link to='#'>
					<div className='profile'>
						<Image src={authData?.result?.imageUrl} avatar />
						<span>{authData?.result?.email}</span>
					</div>
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
											{data.notification && (
												<span
													id='notificationBadge'
													className={
														unreadNotifications.length > 0 ? "active" : ""
													}>
													{unreadNotifications?.length}
												</span>
											)}
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
