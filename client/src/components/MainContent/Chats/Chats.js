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
						<img />
						<div className='resultDetailsContainer'>
							<span className='heading'>{chat?.chatName}</span>
							<span className='subText'>This is last message</span>
						</div>
					</Link>
				);
			})}
		</div>
	);
};

export default Chats;
