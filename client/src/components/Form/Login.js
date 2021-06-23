import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import { login } from "../../actions/auth";
import ModalWrapper from "../Modal/ModalWrapper";
import TextInput from "./TextInput";

const Login = () => {
	const dispatch = useDispatch();

	return (
		<ModalWrapper size='mini' header='LOGIN'>
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
					// dispatch(closeModal());
				}}>
				{({ isSubmitting, isValid, dirty }) => (
					<Form className='ui form'>
						<TextInput name='email' placeholder='Email Address' />
						<TextInput name='password' placeholder='Password' type='password' />
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
		</ModalWrapper>
	);
};

export default Login;
