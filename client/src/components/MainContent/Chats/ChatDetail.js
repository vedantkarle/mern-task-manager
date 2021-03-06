import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import * as api from "../../../api";
import dots from "../../../images/dots.gif";
import LoadingComponent from "../../LoadingComponent";
import "./ChatDetail.css";

const ChatDetail = ({ match }) => {
	const id = match.params.id;
	const location = useLocation();
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.tasks);
	const { chat } = useSelector(state => state.chats);
	const { authData } = useSelector(state => state.auth);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		var pusher = new Pusher("3a0344f04d73dd86262c", {
			cluster: "ap2",
		});

		var channel = pusher.subscribe("messages");
		channel.bind("inserted", function (data) {
			if (data.chat === chat?._id) {
				setMessages([...messages, data]);
			}
		});
		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	useEffect(() => {
		const getSingleChat = async () => {
			try {
				dispatch({ type: "START_LOADING" });
				const { data } = await api.fetchSingleChat(id);

				dispatch({ type: "FETCH_SINGLE_CHAT", payload: data });

				const res = await api.getMessages(id);

				setMessages(res.data);

				dispatch({ type: "END_LOADING" });
			} catch (error) {
				console.log(error);
				dispatch({
					type: "SET_ERROR",
					payload:
						error.response && error.response.data.message
							? error.response.data.message
							: error.message,
				});
			}
		};

		getSingleChat();
	}, [dispatch]);

	const handleSendMessage = e => {
		if (e.which === 13 && !e.shiftKey) {
			messageSubmitted();
			return false;
		}
	};

	const messageSubmitted = () => {
		var content = message.trim();

		if (content !== "") {
			sendNewMessage(content);
			setMessage("");
		}
	};

	const sendNewMessage = async content => {
		try {
			dispatch({ type: "START_LOADING" });

			const { data } = await api.sendMessage(content, chat?._id);

			setMessages([...messages, data]);

			// dispatch({ type: "SEND_MESSAGE", payload: data });

			dispatch({ type: "END_LOADING" });
		} catch (error) {
			console.log(error);
			dispatch({
				type: "SET_ERROR",
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

	if (loading && !chat && !error) return <LoadingComponent />;

	if (error) return <Redirect to='/error' />;
	return (
		<div>
			<div className='title'>
				<h1>Chats</h1>
			</div>
			<div className='chatPageContainer'>
				<div className='chatTitleBarContainer'>
					<div className='chatImagesContainer'>
						{chat?.users?.map((user, index) => {
							console.log(chat?.users);
							return <img key={user?._id} src={user?.photoUrl} />;
						})}
					</div>
					<span id='chatName'>{chat?.chatName}</span>
				</div>
				<div className='mainContentContainer'>
					<div className='chatContainer'>
						<ScrollToBottom className='chatMessages'>
							<ul className='messages'>
								{messages?.map((message, index) => {
									// var lastSender = "";
									// var nextMessage;

									// lastSender = message?.sender;
									// nextMessage = messages[index + 1];

									// var currentSender = message?.sender;
									// var nextSender =
									// 	nextMessage !== null ? nextMessage?.sender : "";

									// var isFirst = lastSender?.email !== currentSender?.email;
									// var isLast = nextSender?.email !== currentSender?.email;

									// console.log(lastSender?.email);
									// // console.log(currentSender?.email);

									return (
										<li
											key={message?._id}
											className={`message ${
												message?.sender?.email === authData?.result.email
													? "mine"
													: "theirs"
											}`}>
											<div className='messageContainer'>
												<span className='messageBody'>{message.content}</span>
											</div>
										</li>
									);
								})}
							</ul>
						</ScrollToBottom>
						<div className='typingDots'>
							<img src={dots} />
						</div>
						<div className='footer'>
							<textarea
								name='messageInput'
								placeholder='Type a message...'
								onKeyDown={e => {
									handleSendMessage(e);
								}}
								onChange={e => setMessage(e.target.value)}
								value={message}
							/>
							<button
								className='sendMessageButton'
								onClick={e => handleSendMessage(e)}>
								<i className='fas fa-paper-plane'></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatDetail;
