import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Card,
	Dropdown,
	Header,
	Icon,
	Progress,
} from "semantic-ui-react";
import "./Task.css";

const Task = ({ id, name, description, todos, startDate, endDate }) => {
	const completedTodos = todos.map(todo => todo.completed === true);
	const unCompletedTodos = todos.map(todo => todo.completed === false);

	const progress = (completedTodos.length / unCompletedTodos.length) * 100;

	return (
		<Card style={{ width: "100%", borderRadius: "10px" }} inverted>
			<Card.Content className='progress'>
				<Card.Header>
					<div className='cardHeader'>
						<Header as={Link} to={`tasks/${id}`}>
							{name}
						</Header>
						<div className='cardHeader-right'>
							<p style={{ fontSize: "14px" }}>
								Created at{" "}
								{format(Date.parse(startDate), "MMMM d, yyyy h:mm a")}
							</p>
							<Dropdown className='icon' icon='ellipsis vertical'>
								<Dropdown.Menu className='left'>
									<Dropdown.Item>
										<Icon name='edit outline' />
										<span className='text'>Edit</span>
									</Dropdown.Item>
									<Dropdown.Item>
										<Icon name='add circle' />
										<span className='text'>Add Members</span>
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>
					</div>
				</Card.Header>
				<Card.Meta>{description}</Card.Meta>
				<Button icon labelPosition='left' floated='right'>
					<Icon name='add' />
					Add Member
				</Button>
				<Card.Description>
					<p>Task Progress</p>
					<Progress percent={progress} progress size='small' color='blue' />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default Task;
