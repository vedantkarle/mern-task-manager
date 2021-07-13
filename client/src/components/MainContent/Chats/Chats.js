import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllChats } from "../../../actions/chats";
import "./Chats.css";

const Chats = () => {
	const dispatch = useDispatch();
	const { chats } = useSelector(state => state.chats);
	const { authData } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(getAllChats());
	}, [dispatch]);

	return (
		<div className='chats'>
			<div className='title'>
				<h1>Chats</h1>
			</div>

			{chats?.map(chat => {
				const sender =
					chat?.latestMessage?.sender.email === authData?.result?.email
						? "You"
						: chat?.latestMessage?.sender?.name;
				return (
					<Link
						key={chat?._id}
						to={`/chats/${chat?._id}`}
						className='resultListItem'>
						<div className='resultsImageContainer'>
							{chat?.users?.map(user => {
								return <img key={user?._id} src={user?.photoUrl} />;
							})}
						</div>
						<div className='resultDetailsContainer  ellipsis'>
							<span className='heading  ellipsis'>{chat?.chatName}</span>
							{chat.latestMessage && (
								<span className='subText  ellipsis'>
									{sender} : {chat?.latestMessage?.content}
								</span>
							)}
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Chats;
