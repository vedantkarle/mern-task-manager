import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "semantic-ui-react";
import { getNotifications } from "../../../actions/tasks";
import LoadingComponent from "../../LoadingComponent";
import "./Notifications.css";

const Notifications = () => {
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.tasks);
	const { notifications } = useSelector(state => state.tasks);

	useEffect(() => {
		dispatch(getNotifications());
	}, [dispatch]);

	const getNotificationText = notification => {
		var userFrom = notification.userFrom;
		var text;

		if (notification.notificationType == "member") {
			text = `${userFrom.name} added you to a new project`;
		}

		if (notification.notificationType == "todo") {
			text = `${userFrom.name} added a new todo to the project you were added in`;
		}

		return text;
	};

	const getNotificationUrl = notification => {
		var url;

		if (
			notification.notificationType === "member" ||
			notification.notificationType === "todo"
		) {
			url = `/tasks/${notification.entityId}`;
		}

		return url;
	};

	const markAsOpened = async (notificationId = null) => {
		var url =
			notificationId != null
				? `/api/notifications/${notificationId}/markAsOpened`
				: `/api/notifications/markAsOpened`;

		await axios.put(url, "", {
			headers: {
				Authorization: `Bearer ${
					JSON.parse(localStorage.getItem("profile")).token
				}`,
			},
		});
	};

	if (loading && !error) return <LoadingComponent />;

	return (
		<div className='notifications'>
			<div className='title'>
				<h1>Notifications</h1>
				<button
					className='markAsOpened'
					onClick={() => {
						markAsOpened();
						window.location.reload();
					}}>
					<i class='fas fa-check-double'></i>
				</button>
			</div>
			<div className='resultsContainer'>
				{notifications.length === 0 ? (
					<Header
						content='No Notifications To Show'
						textAlign='center'
						style={{
							padding: "14px",
							borderBottom: "1px solid #eee",
						}}
					/>
				) : (
					notifications.map(notification => {
						return (
							<Link
								to={getNotificationUrl(notification)}
								className={`resultListItem notification ${
									notification.opened ? "" : "active"
								}`}
								onClick={() => markAsOpened(notification._id)}>
								<div className='resultsImageContainer'>
									<img src={notification?.userFrom.photoUrl} />
								</div>
								<div className='resultsDetailsContainer ellipsis'>
									<span className='ellipsis'>
										{getNotificationText(notification)}
									</span>
								</div>
							</Link>
						);
					})
				)}
			</div>
		</div>
	);
};

export default Notifications;
