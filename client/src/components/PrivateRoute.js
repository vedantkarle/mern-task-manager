import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...props }) => {
	const { isAuth } = useSelector(state => state.auth);

	return (
		<Route
			{...props}
			render={() => (isAuth ? children : <Redirect to='/login' />)}
		/>
	);
};

export default PrivateRoute;
