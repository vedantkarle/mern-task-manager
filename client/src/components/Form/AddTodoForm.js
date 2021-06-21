import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { addTodoToTask } from "../../actions/tasks";
import { closeModal } from "../../reducers/modal";
import ModalWrapper from "../Modal/ModalWrapper";
import TextInput from "./TextInput";

const AddTodoForm = () => {
	const dispatch = useDispatch();

	const { modalProps } = useSelector(state => state.modals);

	const initialValues = {
		description: "",
	};

	const validationSchema = Yup.object({
		description: Yup.string().required("You must provide a description"),
	});

	const handleSubmit = values => {
		dispatch(addTodoToTask(modalProps.id, values));
	};
	return (
		<ModalWrapper size='large' header='Add Todo'>
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
								content='Add'
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

export default AddTodoForm;
