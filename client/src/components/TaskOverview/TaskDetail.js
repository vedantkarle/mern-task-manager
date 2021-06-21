import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Checkbox,
	Dimmer,
	Feed,
	Header,
	Icon,
	Label,
	Loader,
	Message,
	Segment,
} from "semantic-ui-react";
import { deleteTodo, fetchSingleTask } from "../../actions/tasks";
import { openModal } from "../../reducers/modal";
import "./Task.css";

const TaskDetail = ({ match }) => {
	const id = match.params.id;
	const dispatch = useDispatch();
	const { task, loading, error } = useSelector(state => state.tasks);

	useEffect(() => {
		dispatch(fetchSingleTask(id));
	}, [dispatch]);

	return loading && !task ? (
		<Dimmer active>
			<Loader>Loading</Loader>
		</Dimmer>
	) : (
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
										<Segment>
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
							<Feed.Event
								image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
								content='You added Elliot Fu to the group Coworkers'
							/>
							<Feed.Event
								image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
								content='You added Elliot Fu to the group Coworkers'
							/>
							<Feed.Event
								image='https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
								content='You added Elliot Fu to the group Coworkers'
							/>
						</Feed>
						<Button icon labelPosition='left'>
							<Icon name='add' />
							Add Member
						</Button>
					</Segment>
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
