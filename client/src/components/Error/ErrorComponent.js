import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";

const ErrorComponent = () => {
	const { error } = useSelector(state => state.tasks);

	return (
		<Segment placeholder>
			<Header
				textAlign='center'
				content={error || "Oops - Something went wrong"}
			/>
			<Button
				as={Link}
				to='/'
				primary
				style={{ marginTop: 20 }}
				content='Go Back'
			/>
		</Segment>
	);
};

export default ErrorComponent;
