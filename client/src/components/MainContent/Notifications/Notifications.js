import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../../actions/tasks";
import "./Notifications.css";

const Notifications = () => {
	const dispatch = useDispatch();
	const { notifications } = useSelector(state => state.tasks);

	useEffect(() => {
		dispatch(getNotifications());
	}, [dispatch]);

	return (
		<div className='notifications'>
			<div className='title'>
				<h1>Notifications</h1>
			</div>
			<div className='resultsContainer'>
				{notifications.map(notification => {
					return <h3>{notification.notificationType}</h3>;
				})}
			</div>
		</div>
	);
};

export default Notifications;
