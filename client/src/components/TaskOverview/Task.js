import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
	Button,
	Card,
	Dropdown,
	Header,
	Icon,
	Progress,
} from "semantic-ui-react";
import { deleteTask } from "../../actions/tasks";
import { openModal } from "../../reducers/modal";
import "./Task.css";

const Task = ({ id, name, description, todos, startDate }) => {
	const dispatch = useDispatch();
	const completedTodos = todos.filter(todo => todo.completed === true);
	const unCompletedTodos = todos.filter(todo => todo.completed === false);

	const progress = (completedTodos.length / unCompletedTodos.length) * 100;

	return (
		<Card style={{ width: "100%", borderRadius: "10px" }} inverted>
			<Card.Content className='progress'>
				<Card.Header>
					<div className='cardHeader'>
						<Header as={Link} to={`/tasks/${id}`}>
							{name}
						</Header>
						<div className='cardHeader-right'>
							<p style={{ fontSize: "14px" }}>
								Created at {moment(startDate).format("MMMM d, yyyy h:mm a")}
							</p>
							<Dropdown className='icon' icon='ellipsis vertical'>
								<Dropdown.Menu className='left'>
									<Dropdown.Item
										onClick={() =>
											dispatch(
												openModal({
													modalType: "EditProjectForm",
													modalProps: { id },
												})
											)
										}>
										<Icon name='edit outline' />
										<span className='text'>Edit</span>
									</Dropdown.Item>
									<Dropdown.Item onClick={() => dispatch(deleteTask(id))}>
										<Icon name='trash' />
										<span className='text'>Delete</span>
									</Dropdown.Item>
									<Dropdown.Item
										onClick={() =>
											dispatch(openModal({ modalType: "SearchMembers" }))
										}>
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
