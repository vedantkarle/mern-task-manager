import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../actions/tasks";
import LoadingComponent from "../LoadingComponent";
import Task from "./Task";

const Tasks = ({ completed }) => {
	const dispatch = useDispatch();

	const { tasks, loading, error } = useSelector(state => state.tasks);

	useEffect(() => {
		dispatch(getTasks());
	}, [dispatch]);

	if (loading && !error) return <LoadingComponent />;

	return (
		<div>
			{completed
				? tasks.map(task =>
						task?.completed === true ? (
							<Task
								key={task._id}
								id={task._id}
								name={task.projectName}
								description={task.description}
								startDate={task.startDate}
								endDate={task.endDate}
								todos={task.todos}
							/>
						) : null
				  )
				: tasks.map(task =>
						task?.completed === false ? (
							<Task
								key={task?._id}
								id={task?._id}
								name={task?.projectName}
								description={task?.description}
								startDate={task?.startDate}
								endDate={task?.endDate}
								todos={task?.todos}
							/>
						) : null
				  )}
		</div>
	);
};

export default Tasks;
