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
	Image,
	Popup,
	Progress,
} from "semantic-ui-react";
import { deleteTask } from "../../actions/tasks";
import { openModal } from "../../reducers/modal";
import "./Task.css";

const Task = ({
	id,
	name,
	description,
	todos,
	startDate,
	owner,
	members,
	userEmail,
}) => {
	const dispatch = useDispatch();

	const { authData } = useSelector(state => state.auth);

	const completedTodos = todos.filter(todo => todo.completed === true);

	const progress = Math.round((completedTodos.length / todos.length) * 100);

	return (
		<Card style={{ width: "100%", borderRadius: "10px" }} inverted>
			<Card.Content>
				<Card.Header>
					<div className='cardHeader'>
						<Header as={Link} to={`/tasks/${id}`}>
							{name}
						</Header>
						<div className='cardHeader-right'>
							<p style={{ fontSize: "14px" }}>
								Created at {moment(startDate).format("lll")} by{" "}
								<span>{owner.name}</span>
							</p>
							{userEmail === owner.email && (
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
				{owner?.email === authData?.result?.email && members?.length <= 0 ? (
					<Button
						icon
						labelPosition='left'
						floated='right'
						onClick={() => dispatch(openModal({ modalType: "SearchMembers" }))}>
						<Icon name='add' />
						Add Member
					</Button>
				) : (
					<div style={{ float: "right" }}>
						{members?.map(member => {
							return (
								<Popup
									content={member?.email}
									key={member?._id}
									header={member?.name}
									trigger={<Image src={member?.photoUrl} avatar />}
								/>
							);
						})}
					</div>
				)}
				<Card.Description>
					<p>
						Task Progress{" "}
						<span>
							{completedTodos.length} / {todos.length}
						</span>
					</p>
					<Progress percent={progress} progress size='small' color='blue' />
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default Task;
