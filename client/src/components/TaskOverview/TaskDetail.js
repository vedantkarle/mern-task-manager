import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
	Button,
	Checkbox,
	Feed,
	Header,
	Icon,
	Label,
	Message,
	Segment,
} from "semantic-ui-react";
import { deleteTodo, fetchSingleTask } from "../../actions/tasks";
import { openModal } from "../../reducers/modal";
import LoadingComponent from "../LoadingComponent";
import "./Task.css";

const TaskDetail = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();
	const { task, loading, error } = useSelector(state => state.tasks);
	const { authData } = useSelector(state => state.auth);

	useEffect(() => {
		dispatch(fetchSingleTask(id));
	}, [dispatch]);

	if (loading && !task && !error) return <LoadingComponent />;

	if (error) return <Redirect to='/error' />;

	return (
		<div>
			<Message>
				<div className='task-header'>
					<Header as='h1'>{task?.projectName}</Header>
					<div>
						<Label color='blue' icon>
							Created at {moment(task?.startDate).format("MMMM d, yyyy h:mm a")}
						</Label>
						<Label color='yellow' icon>
							Deadline {moment(task?.endDate).format("MMMM d, yyyy h:mm a")}
						</Label>
					</div>
				</div>
				<p>{task?.description}</p>
			</Message>
			<div className='task-content'>
				<div className='todos'>
					<Segment.Group>
						<Segment>
							<h2>Todos:</h2>
						</Segment>
						<Segment.Group>
							{task?.todos.length > 0 ? (
								task?.todos.map(todo => {
									const id = todo._id;
									return (
										<Segment key={id}>
											<Checkbox label={todo?.description} />
											<div className='todo-buttons'>
												<div></div>
												<div>
													<Button
														onClick={() =>
															dispatch(
																openModal({
																	modalType: "EditTodoForm",
																	modalProps: { id },
																})
															)
														}
														circular
														icon='edit'
														color='yellow'
													/>
													<Button
														onClick={() =>
															dispatch(deleteTodo(task._id, todo._id))
														}
														circular
														icon='trash'
														color='red'
													/>
												</div>
											</div>
										</Segment>
									);
								})
							) : (
								<Segment>No Todos Added</Segment>
							)}
						</Segment.Group>
						<Segment>
							<Button
								icon
								labelPosition='left'
								style={{ width: "140px" }}
								onClick={() =>
									dispatch(
										openModal({ modalType: "AddTodoForm", modalProps: { id } })
									)
								}>
								<Icon name='add' />
								Add Todo
							</Button>
						</Segment>
					</Segment.Group>
				</div>
				<div className='members'>
					<Segment color='red'>
						<Header as='h4'>Members</Header>
						<Feed>
							{task?.members.length > 0 ? (
								task?.members.map(member => {
									return (
										<Feed.Event
											image={member?.photoUrl}
											content={member?.name}
											key={member?._id}
										/>
									);
								})
							) : (
								<Segment>No Members Added</Segment>
							)}
						</Feed>
						{task?.owner.email === authData?.result?.email && (
							<Button
								icon
								labelPosition='left'
								onClick={() =>
									dispatch(openModal({ modalType: "SearchMembers" }))
								}>
								<Icon name='add' />
								Add Member
							</Button>
						)}
					</Segment>
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
