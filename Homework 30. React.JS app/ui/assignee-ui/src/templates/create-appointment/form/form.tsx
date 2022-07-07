import React, { ChangeEventHandler, FormEventHandler, FunctionComponent, useState } from 'react';
import validator from 'validator';

import { StyledError, StyledField, StyledForm, StyledInput, StyledLabel, StyleButton } from './form.styled';

type CreateAppointmentFormProps = {
	onFormSubmit: (values: FormValues) => void;
};

export type FormValues = {
	fullName: string;
	email: string;
};

export type FormErrors = {
	fullName: boolean;
	email: boolean;
};

const hasError = (errors: FormErrors): boolean => {
	return Object.keys(errors).some((key) => errors[key as keyof FormErrors]);
};

type Validator = (values: FormValues) => boolean;

const validators: Record<keyof FormValues, Validator> = {
	fullName: ({ fullName }) => fullName.length > 0,
	email: ({ email }) => validator.isEmail(email),
};

const mapErrors = (values: FormValues): FormErrors => {
	const keys = Object.keys(values);

	return keys.reduce((errors: FormErrors, key: string) => {
		const validator = validators[key as keyof FormValues];

		return {
			...errors,
			[key as keyof FormErrors]: !validator(values),
		};
	}, {} as FormErrors);
};

export const CreateAppointmentForm: FunctionComponent<CreateAppointmentFormProps> = ({ onFormSubmit }) => {
	const [values, setValue] = useState<FormValues>({
		fullName: '',
		email: '',
	});

	const [errors, setError] = useState<FormErrors>({
		fullName: false,
		email: false,
	});

	const handleFormSubmit: FormEventHandler = (e) => {
		e.preventDefault();

		const errors = mapErrors(values);

		if (hasError(errors)) {
			setError(errors);
			return;
		}

		onFormSubmit(values);
	};

	const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		if (hasError(errors)) {
			setError({
				fullName: false,
				email: false,
			});
		}

		const { name, value } = e.target;

		setValue((prevState) => ({ ...prevState, [name]: value }));
	};

	return (
		<StyledForm onSubmit={handleFormSubmit} noValidate>
			<StyledLabel htmlFor="fullName">Full Name</StyledLabel>
			<StyledField>
				<StyledInput onChange={handleChange} id="fullName" name="fullName" type="text" value={values.fullName} />
				{errors.fullName && <StyledError>Full Name must be provided</StyledError>}
			</StyledField>
			<StyledLabel htmlFor="email">Email</StyledLabel>
			<StyledField>
				<StyledInput onChange={handleChange} id="email" name="email" type="email" value={values.email} />
				{errors.email && <StyledError>Email must be properly formatted</StyledError>}
			</StyledField>
			<StyleButton type="submit">Create Appointment</StyleButton>
		</StyledForm>
	);
};
