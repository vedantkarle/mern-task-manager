import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Header, Modal, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { createTask } from "../../actions/tasks";
import FloatingButton from "../FloatingButton";
import DateInput from "./DateInput";
import TextInput from "./TextInput";

const CreateProjectForm = () => {
	const [open, setOpen] = useState(false);
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
		dispatch(createTask(values));
	};

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			trigger={<FloatingButton onClick={() => setOpen(true)} />}>
			<Modal.Content image>
				<Segment style={{ width: "100%" }} clearing>
					<Header content='Add Project' />
					<Formik
						initialValues={initialValues}
						onSubmit={(values, { setSubmitting }) => {
							handleSubmit(values);
							setSubmitting(false);
							setOpen(false);
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
									type='submit'
									floated='right'
									color='red'
									content='Cancel'
								/>
							</Form>
						)}
					</Formik>
				</Segment>
			</Modal.Content>
		</Modal>
	);
};

export default CreateProjectForm;
