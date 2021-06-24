import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Grid, Header, Message, Segment } from "semantic-ui-react";
import * as Yup from "yup";
import { addGoogleUser, login } from "../../actions/auth";
import TextInput from "./TextInput";

const Login = ({ history }) => {
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"));
	const { error, loading } = useSelector(state => state.tasks);

	useEffect(() => {
		if (user && !error) {
			history.push("/");
		}
		if (error) {
			toast.error(error);
		}
	}, [user]);

	const googleSuccess = async res => {
		const result = res?.profileObj;
		const token = res?.tokenId;
		try {
			dispatch({ type: "AUTH", data: { result, token } });
			dispatch(
				addGoogleUser({
					name: result.name,
					email: result.email,
					verified: true,
					userType: "google",
				})
			);
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleFailure = error => {
		dispatch({ type: "SET_ERROR", payload: error.message });
		console.log(error);
	};

	return (
		<Grid
			textAlign='center'
			style={{ height: "100vh", width: "100vw" }}
			verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to Tasky
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
							dispatch(login(values, history));
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
									loading={loading}
									disabled={!isValid || !dirty || loading}
									type='submit'
									fluid
									size='large'
									color='primary'
									content='Login'
								/>
								<p>OR</p>
								<GoogleLogin
									clientId='988842926941-31qjgdsd2ahb2v8j0gra9ppp4ojlbaic.apps.googleusercontent.com'
									render={renderProps => (
										<Button
											icon='google'
											onClick={renderProps.onClick}
											disabled={renderProps.disabled}
											fluid
											size='large'
											color='primary'
											content='Login with Google'
										/>
									)}
									onSuccess={googleSuccess}
									onFailure={googleFailure}
									cookiePolicy='single_host_origin'
								/>
							</Form>
						)}
					</Formik>
				</Segment>
				<Message>
					New to us? <Link to='/register'>Register</Link>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Login;
