import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

const Task = ({ id, name, description, todos, startDate, owner }) => {
	const dispatch = useDispatch();

	const { authData } = useSelector(state => state.auth);

	const completedTodos = todos.filter(todo => todo.completed === true);
	const unCompletedTodos = todos.filter(todo => todo.completed === false);

	const progress = (completedTodos.length / unCompletedTodos.length) * 100;

	const getTaskMemberImageElements = () => {
		var groupOfMembersClass = "";
	};

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
								Created at {moment(startDate).format("MMMM d, yyyy h:mm a")} by{" "}
								<span>{owner?.name}</span>
							</p>
							{authData?.result?.email === owner?.email && (
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
							)}
						</div>
					</div>
				</Card.Header>
				<Card.Meta>{description}</Card.Meta>
				{owner?.email === authData?.result?.email && (
					<Button
						icon
						labelPosition='left'
						floated='right'
						onClick={() => dispatch(openModal({ modalType: "SearchMembers" }))}>
						<Icon name='add' />
						Add Member
					</Button>
				)}
				<Card.Description>
					<p>Task Progress</p>
					<Progress percent={progress} progress size='small' color='blue' />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default Task;
