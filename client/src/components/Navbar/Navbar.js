import React from "react";
import { Icon } from "semantic-ui-react";

const Navbar = () => {
	return (
		<div className='ui top fixed menu inverted' style={{ height: "70px" }}>
			<a className='item'>Tasky</a>
			<div className='right menu'>
				<a className='item'>
					<Icon name='bell' />
				</a>
				<a className='item'>Login</a>
				<a className='item'>Register</a>
				<a className='item'>Logout</a>
			</div>
		</div>
	);
};

export default Navbar;
