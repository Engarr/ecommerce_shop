import React, { useState, useEffect } from 'react';
import classes from './UpdateData.module.css';
import Input from '../UI/Input';
import { IoReturnUpForward } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { getAuthToken } from '../../utils/auth';
import {
	isEmailValid,
	isPasswordValid,
	isRepeatPasswordValid,
} from '../../utils/validation';

const UpdateData = ({ optionHandler }) => {
	const [isActiveChangePsw, setIsActiveChangePsw] = useState(false);
	const [isActiveChangeEmail, setIsActiveChangeEmail] = useState(false);
	const [errors, setErrors] = useState({
		email: false,
		password: false,
		repeatPasswrod: false,
		newEmail: false,
	});

	const token = getAuthToken();

	const [newPassword, setNewPassword] = useState({
		email: '',
		newPassword: '',
		repeatNewPassword: '',
	});
	const [newEmail, setNewEmail] = useState({
		newEmail: '',
		password: '',
	});

	const activePswHandler = () => {
		setIsActiveChangePsw((prev) => (prev = !prev));
		setIsActiveChangeEmail(false);
	};
	const activeEmailHandler = () => {
		setIsActiveChangeEmail((prev) => (prev = !prev));
		setIsActiveChangePsw(false);
	};
	useEffect(() => {
		if (newPassword.email !== '') {
			setErrors((prevError) => ({
				...prevError,
				email: false,
			}));
		}
		if (newPassword.newPassword !== '') {
			setErrors((prevError) => ({
				...prevError,
				password: false,
			}));
		}
		if (newPassword.repeatNewPassword !== '') {
			setErrors((prevError) => ({
				...prevError,
				repeatNewPassword: false,
			}));
		}
	}, [newPassword]);
	useEffect(() => {
		if (newEmail.newEmail !== '') {
			setErrors((prevError) => ({
				...prevError,
				newEmail: false,
			}));
		}
	}, [newEmail]);

	const cssStylePw = isActiveChangePsw ? classes.active : '';
	const cssStyleEmail = isActiveChangeEmail ? classes.activeEmail : '';

	const newPasswordHandler = (e) => {
		setNewPassword((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const newEmailHandler = (e) => {
		setNewEmail((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const validationChnagePassword = () => {
		let isValid = true;
		if (!isEmailValid(newPassword.email)) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				email: true,
			}));
		}
		if (!isPasswordValid(newPassword.newPassword)) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				password: true,
			}));
		}
		if (
			!isRepeatPasswordValid(
				newPassword.newPassword,
				newPassword.repeatNewPassword
			)
		) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				repeatPasswrod: true,
			}));
		}

		return isValid;
	};
	const newEmailValidation = () => {
		let isValid = true;

		if (!isEmailValid(newEmail.newEmail)) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				newEmail: true,
			}));
		}

		return isValid;
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formType = formData.get('type');

		let data;
		if (formType === 'changeEmail') {
			if (newEmailValidation()) {
				data = {
					email: newEmail.newEmail,
					password: newEmail.password,
				};
			}
		} else {
			if (validationChnagePassword()) {
				data = {
					email: newPassword.email,
					password: newPassword.newPassword,
				};
			}
		}

		if (data) {
			const response = await fetch('http://localhost:8080/auth/change', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					formType: formType,
					email: data.email,
					password: data.password,
				}),
			});
			const responseData = await response.json();
			if (response.ok) {
				console.log(responseData);
			} else {
			}
		}
	};

	return (
		<div className={classes.main}>
			<div className={classes.optionContainer}>
				<div className={classes.return} onClick={optionHandler}>
					<IoReturnUpForward />
				</div>
				<div className={classes.title}>
					<p>Options:</p>
				</div>

				<div className={classes.optionBox}>
					<form className={classes.passwordBox} onSubmit={onSubmit}>
						<div className={classes.changeTitle} onClick={activePswHandler}>
							<p className={classes.optionTitle}>Change password:</p>
							<MdKeyboardArrowDown
								className={`${classes.icon} ${
									isActiveChangePsw ? classes.rotate : ''
								}`}
							/>
						</div>

						<div className={`${classes.inputBox} ${cssStylePw}`}>
							<input type='hidden' name='type' value='changePassword' />
							<Input
								data='email'
								placeholder='E-mail'
								text='Your E-mail:'
								type='text'
								onChange={newPasswordHandler}
								error={errors.email}
							/>
							{errors.email && (
								<p className={classes.errorInfo}>Please enter valid email.</p>
							)}

							<Input
								data='newPassword'
								placeholder='New password'
								text='New password:'
								type='password'
								error={errors.password}
								onChange={newPasswordHandler}
							/>

							{errors.password && (
								<p className={classes.errorInfo}>
									* Password should to contain min 8 characters one digital and
									one special character
								</p>
							)}

							<Input
								data='repeatNewPassword'
								placeholder='Repeat new password'
								text='Repeat new password:'
								type='password'
								onChange={newPasswordHandler}
								error={errors.repeatPasswrod}
							/>
							{errors.repeatPasswrod && (
								<p className={classes.errorInfo}>Passwords must be the same</p>
							)}

							<div className={classes.btn}>
								<button type='submit' className={classes.btn}>
									Change password
								</button>
							</div>
						</div>
					</form>

					<form className={classes.emailBox} onSubmit={onSubmit}>
						<div className={classes.changeTitle} onClick={activeEmailHandler}>
							<p className={classes.optionTitle}>Change E-mail</p>
							<MdKeyboardArrowDown
								className={`${classes.icon} ${
									isActiveChangeEmail ? classes.rotate : ''
								}`}
							/>
						</div>

						<div className={`${classes.inputBox} ${cssStyleEmail}`}>
							<input type='hidden' name='type' value='changeEmail' />
							<Input
								data='newEmail'
								placeholder='New e-mail'
								text='New e-mail:'
								type='text'
								onChange={newEmailHandler}
								error={errors.newEmail}
							/>
							{errors.newEmail && (
								<p className={classes.errorInfo}>Please enter valid email.</p>
							)}
							<Input
								data='password'
								placeholder='password'
								text='Password:'
								type='password'
								onChange={newEmailHandler}
							/>

							<div className={classes.btn}>
								<button type='submit'>Change e-mail</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateData;
