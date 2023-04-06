import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Input from '../components/UI/Input';
import {
	isEmailValid,
	isPasswordValid,
	isRepeatPasswordValid,
	isNameValid,
} from '../utils/validation';

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

	const isDataValid = async () => {
		let isValid = true;
		if (!isNameValid(formData.name)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				name: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isEmailValid(formData.email)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isPasswordValid(formData.password)) {
			setErrors((prevErrors) => ({
				...prevErrors,
				password: true,
				error: true,
			}));
			isValid = false;
		}
		if (!isRepeatPasswordValid(formData.password, formData.repeatPassword)) {
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
			<form className={classes.registerContainer} onSubmit={onSubmit}>
				<h2>Registration</h2>

				<div className={classes.box}>
					<Input
						data='name'
						text='Your name:'
						type='text'
						placeholder='Your name'
						onChange={formDataHandler}
						error={errors.name}
					/>
					{(errors.name && <p>Please write your name</p>) ||
						(backendErrors.name && <p>{backendErrors.name}</p>)}
				</div>
				<div className={classes.box}>
					<Input
						data='email'
						text='E-mail:'
						type='text'
						placeholder='E-mail'
						onChange={formDataHandler}
						error={errors.email}
					/>
					{(errors.email && <p>Please write valid email</p>) ||
						(backendErrors.email && <p>{backendErrors.email}</p>)}
				</div>
				<div className={classes.box}>
					<Input
						data='password'
						text='* Password:'
						type='password'
						placeholder='E-mail'
						onChange={formDataHandler}
						error={errors.password}
					/>
					{(errors.password && (
						<p>The password must meet the described conditions</p>
					)) ||
						(backendErrors.password && <p>{backendErrors.password}</p>)}
				</div>
				<div className={classes.box}>
					<Input
						data='repeatPassword'
						text='Repeat Password:'
						type='repeatPassword'
						placeholder='Repeat Password'
						onChange={formDataHandler}
						error={errors.repeatPassword}
					/>
					{(errors.repeatPassword && <p>Passwords are different</p>) ||
						(backendErrors.repeatPassword && (
							<p>{backendErrors.repeatPassword}</p>
						))}
				</div>

				<p>Additional information:</p>
				<div className={classes.box}>
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
						(backendErrors.isChecked && <p>{backendErrors.isChecked}</p>)}
				</div>
				<div className={classes.buttonBox}>
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
