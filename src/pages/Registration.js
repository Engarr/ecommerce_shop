import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/Registration.module.css';
const Registration = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
		isChecked: false,
	});

	const [errors, setErrors] = useState({
		error: false,
		name: false,
		email: false,
		password: false,
		repeatPassword: false,
		isChecked: false,
		isEmailExistError: false,
	});
	const [backendErrors, setBackendErrors] = useState({
		name: '',
		email: '',
		password: '',
		repeatPassword: '',
		isChecked: '',
		isEmailExistError: '',
	});
	const [isBackendError, setIsBackendError] = useState({
		name: false,
		email: false,
		password: false,
		repeatPassword: false,
		isChecked: false,
		isEmailExistError: false,
	});

	useEffect(() => {
		const newValidation = {};
		Object.keys(backendErrors).forEach((key) => {
			newValidation[key] = backendErrors[key] !== '';
		});
		setIsBackendError(newValidation);
	}, [backendErrors]);

	const formDataHandler = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleCheckboxChange = (e) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			isChecked: e.target.checked,
		}));
	};

	useEffect(() => {
		if (formData.name !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				name: false,
			}));
		}
		if (formData.email !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: false,
			}));
		}
		if (formData.password !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: false,
			}));
		}
		if (formData.repeatPassword !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				repeatPassword: false,
			}));
		}
		if (formData.isChecked === true) {
			setErrors((prevErrors) => ({
				...prevErrors,
				isChecked: false,
			}));
		}
	}, [formData]);

	const erorrHandler = () => {
		setErrors((prevErrors) => ({
			...prevErrors,
			error: false,
		}));
	};

	const isDataValid = async () => {
		let isValid = true;
		if (!isNameValid()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				name: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isEmailValid()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isPasswordValid()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isRepeatPasswordValid()) {
			setErrors((prevErrors) => ({
				...prevErrors,
				repeatPassword: true,
				error: true,
			}));
			isValid = false;
		}
		if (!formData.isChecked) {
			setErrors((prevErrors) => ({
				...prevErrors,
				isChecked: true,
				error: true,
			}));
			isValid = false;
		}

		return isValid;
	};

	const isNameValid = () => {
		let isValid = true;
		if (formData.name === '') {
			isValid = false;
		}
		return isValid;
	};
	const isEmailValid = () => {
		let isValid = true;
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!re.test(formData.email)) {
			isValid = false;
		}

		return isValid;
	};

	const isPasswordValid = () => {
		let isValid = true;
		if (formData.password.length < 5) {
			isValid = false;
		}
		if (!/\d/.test(formData.password)) {
			isValid = false;
		}

		if (!/[!@#$%^&*()+=._-]/.test(formData.password)) {
			isValid = false;
		} else {
		}
		return isValid;
	};
	const isRepeatPasswordValid = () => {
		let isValid = true;
		if (formData.password !== formData.repeatPassword) {
			isValid = false;
		}
		return isValid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (await isDataValid()) {
			const userData = {
				name: formData.name,
				email: formData.email,
				password: formData.password,
				repeatPassword: formData.repeatPassword,
				isChecked: formData.isChecked,
			};
			const response = await fetch('http://localhost:8080/auth/signup', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});
			const data = await response.json();

			if (response.ok) {
				toast.success('User has been created!');
				navigate('/login');
			} else {
				toast.error('Registration failed');
				const errorObject = {};
				data.errors.forEach((error) => {
					errorObject[error.param] = error.msg;
				});
				setBackendErrors(errorObject);
			}
		}
	};

	return (
		<div className={classes.mainContainer}>
			{errors.error && (
				<div className={classes.error}>
					<AiOutlineClose className={classes.closeBtn} onClick={erorrHandler} />
					<p>The registration form contains errors.</p>
				</div>
			)}
			<form className={classes.registerContainer} onSubmit={onSubmit}>
				<h2>Registration</h2>

				<div
					className={
						errors.name || backendErrors.name
							? `${classes.nameBox} ${classes.inputError}`
							: classes.nameBox
					}>
					<label htmlFor='name'>* Your name:</label>
					<input
						name='name'
						id='name'
						value={formData.name}
						onChange={formDataHandler}></input>
					{(errors.name && <p>Please write your name</p>) ||
						(isBackendError.name && <p>{backendErrors.name}</p>)}
				</div>

				<div
					className={
						errors.email || backendErrors.email
							? `${classes.emailBox} ${classes.inputError}`
							: classes.emailBox
					}>
					<label htmlFor='email'>* E-mail:</label>
					<input
						name='email'
						id='email'
						value={formData.email}
						onChange={formDataHandler}
						autoComplete='email'></input>
					{(errors.email && <p>Invalid email address format</p>) ||
						(isBackendError.email && <p>{backendErrors.email}</p>)}
				</div>
				<div
					className={
						errors.password || backendErrors.password
							? `${classes.passwordBox} ${classes.inputError}`
							: classes.passwordBox
					}>
					<label htmlFor='password'>* Password:</label>
					<input
						name='password'
						id='password'
						type='password'
						value={formData.password}
						onChange={formDataHandler}
						autoComplete='new-password'></input>
					{(errors.password && (
						<p>The password must meet the described conditions</p>
					)) ||
						(isBackendError.password && <p>{backendErrors.password}</p>)}
				</div>
				<div
					className={
						errors.repeatPassword || backendErrors.repeatPassword
							? `${classes.passwordBox} ${classes.inputError}`
							: classes.passwordBox
					}>
					<label htmlFor='repeatPassword'>* Repeat password:</label>
					<input
						name='repeatPassword'
						id='repeatPassword'
						type='password'
						value={formData.repeatPassword}
						onChange={formDataHandler}
						autoComplete='new-password'
					/>
					{(errors.repeatPassword && <p>The passwords are different</p>) ||
						(isBackendError.repeatPassword && (
							<p>{backendErrors.repeatPassword}</p>
						))}
				</div>
				<p>Additional information:</p>
				<div className={classes.checkBox}>
					<input
						type='checkbox'
						id='check'
						checked={formData.isChecked}
						onChange={handleCheckboxChange}
					/>
					<label htmlFor='check'>
						I have read the regulations of the online store and accept its
						content.
					</label>
					{(errors.isChecked && <p>You have to accept the terms</p>) ||
						(isBackendError.isChecked && <p>{backendErrors.repeatPassword}</p>)}
				</div>
				<div>
					<button type='submit'>Register</button>
				</div>
				<div className={classes.moreInfoBox}>
					* Password should to contain min 8 characters one digital and one
					special character
				</div>
			</form>
		</div>
	);
};

export default Registration;

// export async function action({ request }) {
// 	const data = await request.formData();
// 	const registerData = {
// 		name: data.get('name'),
// 		email: data.get('email'),
// 		password: data.get('password'),
// 		repeatPassword: data.get('repeatPassword'),
// 	};

// 	const response = await fetch('http://localhost:8080/auth/signup', {
// 		method: 'PUT',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(registerData),
// 	});
// 	if (!response.ok) {
// 		throw json({ message: 'Could not register the user' }, { status: 500 });
// 	}
// }
