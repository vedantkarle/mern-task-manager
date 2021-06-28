import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { createTask } from "../../actions/tasks";
import { closeModal } from "../../reducers/modal";
import ModalWrapper from "../Modal/ModalWrapper";
import DateInput from "./DateInput";
import TextInput from "./TextInput";

const CreateProjectForm = () => {
	const dispatch = useDispatch();

	const initialValues = {
		projectName: "",
		description: "",
		startDate: "",
		endDate: "",
	};

	const validationSchema = Yup.object({
		projectName: Yup.string().required("You must provide a project name"),
		description: Yup.string().required("You must provide a description"),
		startDate: Yup.date().required("You must provide a start date"),
		endDate: Yup.date().required("You must provide a end date"),
	});

	const handleSubmit = values => {
		console.log(values);
		dispatch(createTask(values));
	};

	return (
		<ModalWrapper size='large' header='Add Project'>
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
								name='projectName'
								placeholder='Enter project name'
								label='Project Name'
							/>
							<TextInput
								name='description'
								placeholder='Enter project description'
								label='Project Description'
							/>
							<div style={{ display: "flex", justifyContent: "start" }}>
								<DateInput
									name='startDate'
									label='Start Date'
									timeFormat='HH:mm'
									showTimeSelect
									timeCaption='time'
									dateFormat='MMMM d, yyyy h:mm a'
								/>
								<DateInput
									name='endDate'
									label='End Date'
									timeFormat='HH:mm'
									showTimeSelect
									timeCaption='time'
									dateFormat='MMMM d, yyyy h:mm a'
								/>
							</div>
							<Button
								loading={isSubmitting}
								disabled={!isValid || !dirty || isSubmitting}
								type='submit'
								floated='right'
								positive
								content='Create'
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

export default CreateProjectForm;
