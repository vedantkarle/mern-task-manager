import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import TextInput from "./TextInput";

const Register = ({ history }) => {
	const dispatch = useDispatch();
	const { isAuth } = useSelector(state => state.auth);

	useEffect(() => {
		if (isAuth) {
			history.push("/");
		}
	}, [isAuth]);

	return (
		<Grid
			textAlign='center'
			style={{ height: "100vh", width: "100vw" }}
			verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Register to Tasky
				</Header>
				<Segment>
					<Formik
						initialValues={{
							name: "",
							email: "",
							password: "",
						}}
						validationSchema={Yup.object({
							name: Yup.string().required("Name is required"),
							email: Yup.string().required("Email is required").email(),
							password: Yup.string().required("Password is required").min(8),
						})}
						onSubmit={(values, { setSubmitting }) => {
							setSubmitting(false);
						}}>
						{({ isSubmitting, isValid, dirty }) => (
							<Form className='ui form'>
								<TextInput
									name='name'
									fluid
									icon='user'
									iconPosition='left'
									placeholder='Full name'
								/>
								<TextInput
									name='email'
									fluid
									icon='envelope'
									iconPosition='left'
									placeholder='E-mail address'
								/>
								<TextInput
									name='password'
									placeholder='Password'
									type='password'
									fluid
									icon='lock'
									iconPosition='left'
								/>
								<Button
									loading={isSubmitting}
									disabled={!isValid || !dirty || isSubmitting}
									type='submit'
									fluid
									size='large'
									color='primary'
									content='Register'
								/>
							</Form>
						)}
					</Formik>
				</Segment>
				<Message>
					Already a user? <Link to='/login'>Login</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Register;
