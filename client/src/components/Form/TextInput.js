import { useField } from "formik";
import React from "react";
import { FormField, FormInput, Label } from "semantic-ui-react";

const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props);

	return (
		<FormField error={meta.touched && !!meta.error}>
			<label>{label}</label>
			<FormInput {...field} {...props} />
			{meta.touched && meta.error ? (
				<Label basic color='red'>
					{meta.error}
				</Label>
			) : null}
		</FormField>
	);
};

export default TextInput;
