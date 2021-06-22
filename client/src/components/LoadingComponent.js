import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponent = ({ content = "Loading..." }) => {
	return (
		<Dimmer active>
			<Loader>{content}</Loader>
		</Dimmer>
	);
};

export default LoadingComponent;
