import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const user = JSON.parse(localStorage.getItem("profile"));

	return (
		<Route
			{...rest}
			render={props =>
				user ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
};

export default PrivateRoute;
