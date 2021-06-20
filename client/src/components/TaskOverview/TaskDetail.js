import { format } from "date-fns/esm";
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
import { getTasks } from "../../actions/tasks";
import "./Task.css";

const TaskDetail = ({ match }) => {
	const dispatch = useDispatch();
	const { tasks, loading, error } = useSelector(state => state.tasks);

	const task = tasks.find(task => task._id === match.params.id);

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	return loading && tasks.length <= 0 ? (
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
							Created at
							{format(Date.parse(task?.startDate), "MMMM d, yyyy h:mm a")}
						</Label>
						<Label color='yellow' icon>
							Deadline
							{format(Date.parse(task?.endDate), "MMMM d, yyyy h:mm a")}
						</Label>
					</div>
				</div>
				<p>{task.description}</p>
			</Message>
			<div className='task-content'>
				<div className='todos'>
					<Segment.Group>
						<Segment>
							<h2>Todos:</h2>
						</Segment>
						<Segment.Group>
							{task.todos.length > 0 ? (
								task.todos.map(todo => {
									return (
										<Segment>
											<Checkbox label={todo.description} />
											<div className='todo-buttons'>
												<div></div>
												<div>
													<Button circular icon='edit' color='yellow' />
													<Button circular icon='trash' color='red' />
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
							<Button icon labelPosition='left' style={{ width: "140px" }}>
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
