import { format } from "date-fns";
import React from "react";
import { Icon, Label, Tab } from "semantic-ui-react";
import Tasks from "../../Task/Tasks";
import "./Today.css";

const Today = () => {
	const panes = [
		{
			menuItem: "In Progress",
			render: () => (
				<Tab.Pane attached={false} as='div'>
					<Tasks completed={false} />
				</Tab.Pane>
			),
		},
		{
			menuItem: "Completed",
			render: () => (
				<Tab.Pane attached={false} as='div'>
					<Tasks completed={true} />
				</Tab.Pane>
			),
		},
	];

	return (
		<div className='today'>
			<Label>
				<Icon name='calendar alternate' /> Today{" "}
				{format(new Date(), "MMMM d, yyyy h:mm a")}
			</Label>
			<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
		</div>
	);
};

export default Today;
