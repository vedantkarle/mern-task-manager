import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchSingleChat } from "../../../actions/chats";
import LoadingComponent from "../../LoadingComponent";
import "./ChatDetail.css";

const ChatDetail = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();
	const { loading, error } = useSelector(state => state.tasks);
	const { chat } = useSelector(state => state.chats);
	const { authData } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchSingleChat(id));
	}, [dispatch]);

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
						<div className='chatMessages'></div>
						<div className='footer'>
							<textarea name='messageInput' placeholder='Type a message...' />
							<button className='sendMessageButton'>
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
