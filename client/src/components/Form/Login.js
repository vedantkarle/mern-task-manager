import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Header, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { login } from "../../actions/auth";
import TextInput from "./TextInput";

const Login = ({ history }) => {
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
					Log-in to your account
				</Header>
				<Segment>
					<Formik
						initialValues={{
							email: "",
							password: "",
						}}
						validationSchema={Yup.object({
							email: Yup.string().required("Email is required").email(),
							password: Yup.string().required("Password is required").min(8),
						})}
						onSubmit={(values, { setSubmitting }) => {
							dispatch(login(values));
							setSubmitting(false);
						}}>
						{({ isSubmitting, isValid, dirty }) => (
							<Form className='ui form'>
								<TextInput
									name='email'
									fluid
									icon='user'
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
									content='Login'
								/>
							</Form>
						)}
					</Formik>
				</Segment>
				<Message>
					New to us? <a href='#'>Sign Up</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Login;
