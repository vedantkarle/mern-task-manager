import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { editTodo } from "../../actions/tasks";
import { closeModal } from "../../reducers/modal";
import ModalWrapper from "../Modal/ModalWrapper";
import TextInput from "./TextInput";

const EditTodoForm = () => {
	const dispatch = useDispatch();

	const { modalProps } = useSelector(state => state.modals);
	const { task, loading, error } = useSelector(state => state.tasks);
	const todo = task.todos.find(todo => todo._id === modalProps.id);

	const initialValues = {
		description: todo.description,
	};

	const validationSchema = Yup.object({
		description: Yup.string().required("You must provide a description"),
	});

	const handleSubmit = values => {
		dispatch(editTodo(modalProps.id, task._id, values));
	};

	return (
		<ModalWrapper size='large' header='Edit Todo'>
			<Segment style={{ width: "100%" }} clearing>
				<Formik
					initialValues={initialValues}
					onSubmit={(values, { setSubmitting }) => {
						handleSubmit(values);
						setSubmitting(false);
						dispatch(closeModal());
					}}
					validationSchema={validationSchema}>
					{({ isSubmitting, dirty, isValid }) => (
						<Form className='ui form'>
							<TextInput
								name='description'
								placeholder='Enter todo description'
								label='Todo Description'
							/>
							<Button
								loading={isSubmitting}
								disabled={!isValid || !dirty || isSubmitting}
								type='submit'
								floated='right'
								positive
								content='Update'
							/>
							<Button
								disabled={isSubmitting}
								floated='right'
								color='red'
								content='Cancel'
								onClick={() => dispatch(closeModal())}
							/>
						</Form>
					)}
				</Formik>
			</Segment>
		</ModalWrapper>
	);
};

export default EditTodoForm;
