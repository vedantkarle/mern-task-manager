import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "semantic-ui-react";
import { openModal } from "../../reducers/modal";

const Navbar = () => {
	const dispatch = useDispatch();

	return (
		<div className='ui top fixed menu inverted' style={{ height: "70px" }}>
			<a className='item'>Tasky</a>
			<div className='right menu'>
				<a className='item'>
					<Icon name='bell' />
				</a>
				<a
					className='item'
					onClick={() => dispatch(openModal({ modalType: "Login" }))}>
					Login
				</a>
				<a className='item'>Register</a>
				<a className='item'>Logout</a>
			</div>
		</div>
	);
};

export default Navbar;
