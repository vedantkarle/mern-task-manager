import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import { fetchSingleChat, sendMessage } from "../../../actions/chats";
import dots from "../../../images/dots.gif";
import LoadingComponent from "../../LoadingComponent";
import "./ChatDetail.css";

let socket;
var connected = false;
var typing = false;
var lastTypingtime;

const ChatDetail = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.tasks);
	const { chat, messages } = useSelector(state => state.chats);
	const { authData } = useSelector(state => state.auth);
	const [message, setMessage] = useState("");
	const ENDPONT = "localhost:5000";
	const { result } = JSON.parse(localStorage.getItem("profile"));

	useEffect(() => {
		dispatch(fetchSingleChat(id));
		socket = io(ENDPONT);
		socket.emit("setup", result);
		socket.on("connected", () => (connected = true));

		socket.emit("join room", id);

		socket.on(
			"typing",
			() => (document.querySelector(".typingDots").style.display = "block")
		);
		socket.on(
			"stop typing",
			() => (document.querySelector(".typingDots").style.display = "none")
		);
	}, [ENDPONT, dispatch]);

	const updateTyping = () => {
		if (!connected) return;

		if (!typing) {
			typing = true;
			socket.emit("typing", id);
		}

		lastTypingtime = new Date().getTime();

		var timerLength = 3000;

		setTimeout(() => {
			var timeNow = new Date().getTime();
			var timeDiff = timeNow - lastTypingtime;

			if (timeDiff >= timerLength && typing) {
				socket.emit("stop typing", id);
				typing = false;
			}
		}, timerLength);
	};

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
			socket.emit("stop typing", id);
			typing = false;
		}
	};

	const sendNewMessage = content => {
		dispatch(sendMessage(content, chat?._id));
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
							var maxImagesToShow = 1;
							var remainingUsers = chat?.users?.length - maxImagesToShow;
							remainingUsers--;
							if (index < 3 && user.email !== authData.result.email)
								return <img key={user?._id} src={user?.photoUrl} />;
							else if (remainingUsers > 0)
								return <span className='userCount'>+{remainingUsers}</span>;
							else return null;
						})}
					</div>
					<span id='chatName'>{chat?.chatName}</span>
				</div>
				<div className='mainContentContainer'>
					<div className='chatContainer'>
						<ScrollToBottom className='chatMessages'>
							<ul>
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
									updateTyping();
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
