import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllChats } from "../../../actions/chats";
import "./Chats.css";

const Chats = () => {
	const dispatch = useDispatch();
	const { chats } = useSelector(state => state.chats);

	useEffect(() => {
		dispatch(getAllChats());
	}, [dispatch]);

	return (
		<div className='chats'>
			<div className='title'>
				<h1>Chats</h1>
			</div>

			{chats?.map(chat => {
				return (
					<Link to={`/chats/${chat?._id}`} className='resultListItem'>
						<div className='resultsImageContainer'>
							{chat?.users?.map(user => {
								return <img key={user?._id} src={user?.photoUrl} />;
							})}
						</div>
						<div className='resultDetailsContainer  ellipsis'>
							<span className='heading  ellipsis'>{chat?.chatName}</span>
							<span className='subText  ellipsis'>This is last message</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Chats;
