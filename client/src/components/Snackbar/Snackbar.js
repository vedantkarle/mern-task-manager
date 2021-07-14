import React from "react";
import "./Snackbar.css";

const Snackbar = ({ message, sender }) => {
	return (
		<div className='snackbar'>
			<div className='symbol'>
				<i class='far fa-comment-dots'></i>
			</div>
			<div className='message'>
				<span>{sender} : </span>
				{message}
			</div>
		</div>
	);
};

export default Snackbar;
