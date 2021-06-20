import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dimmer, Loader } from "semantic-ui-react";
import { getTasks } from "../../actions/tasks";
import Task from "./Task";

const Tasks = () => {
	const dispatch = useDispatch();

	const { tasks, loading, error } = useSelector(state => state.tasks);

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	console.log(tasks);

	return (
		<div>
			{loading ? (
				<Dimmer active>
					<Loader>Loading</Loader>
				</Dimmer>
			) : (
				tasks.map(task => {
					return (
						<Task
							key={task._id}
							id={task._id}
							name={task.projectName}
							description={task.description}
							startDate={task.startDate}
							endDate={task.endDate}
							todos={task.todos}
						/>
					);
				})
			)}
		</div>
	);
};

export default Tasks;
