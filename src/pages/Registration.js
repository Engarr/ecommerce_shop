import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { client } from '../utils/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/Registration.module.css';
const Registration = () => {
	const [error, setError] = useState(false);
	const [name, setName] = useState('');
	const [nameError, setNamError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [repeatedPassword, setRepeatedPassword] = useState('');
	const [repeatedpasswordError, setRepeatedPasswordError] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [errorIsChecked, setErrorIsChecked] = useState(false);
	const [isEmailExistError, setIsEmailExistError] = useState(false);
	const navigate = useNavigate();


	const nameHandler = (e) => {
		setName(e.target.value);
	};
	const emailHandler = (e) => {
		setEmail(e.target.value);
	};
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const repeatedPasswordHandler = (e) => {
		setRepeatedPassword(e.target.value);
	};

	const erorrHandler = () => {
		setError(false);
	};

	const isDataValid = async () => {
		let isValid = true;
		if (!isNameValid()) {
			setNamError(true);
			setError(true);
			isValid = false;
		} else {
			setNamError(false);
		}
		if (!isEmailValid()) {
			setEmailError(true);
			setError(true);
			isValid = false;
		} else {
			setEmailError(false);
			if (await isEmailExists(email)) {
				setIsEmailExistError(true);
				isValid = false;
			} else {
				setIsEmailExistError(false);
			}
		}
		if (!isPasswordValid()) {
			setPasswordError(true);
			setError(true);
			isValid = false;
		} else {
			setPasswordError(false);
		}
		if (!isRepeatPasswordValid()) {
			setRepeatedPasswordError(true);
			setError(true);
			isValid = false;
		} else {
			setRepeatedPasswordError(false);
		}
		if (!isChecked) {
			setErrorIsChecked(true);
			setError(true);
			isValid = false;
		} else {
			setErrorIsChecked(false);
		}

		return isValid;
	};

	const isEmailExists = async (email) => {
		const query = `*[_type == 'user']{
			email
		  }`;

		const data = await client.fetch(query);
		if (data && data.length > 0) {
			console.log(data.find((user) => user.email === email) !== undefined);
			return data.find((user) => user.email === email) !== undefined;
		}
	};

	const isNameValid = () => {
		let isValid = true;
		if (name === '') {
			isValid = false;
		}
		return isValid;
	};
	const isEmailValid = () => {
		let isValid = true;
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!re.test(email)) {
			isValid = false;
		}

		return isValid;
	};

	const isPasswordValid = () => {
		let isValid = true;
		if (password.length < 8) {
			isValid = false;
		}
		if (!/\d/.test(password)) {
			isValid = false;
		}

		if (!/[!@#$%^&*()+=._-]/.test(password)) {
			isValid = false;
		} else {
		}
		return isValid;
	};
	const isRepeatPasswordValid = () => {
		let isValid = true;
		if (password !== repeatedPassword) {
			setRepeatedPasswordError(true);
			isValid = false;
		}
		return isValid;
	};

	


	const onSubmit = async (e) => {
		e.preventDefault();
		if (await isDataValid()) {
			// const doc = {
			// 	_type: 'user',
			// 	name: name,
			// 	email: email,
			// 	password: password,
			// 	isChecked: isChecked,
			// 	userId: uuidv4(),
			// };
			console.log('onSubmit isDataValid');
			toast.success(`The account has been created.`);
			// client.create(doc).then(() => {
			// 	navigate('/home');
			// });
			// setName('');
			// setEmail('');
			// setPassword('');
			// setRepeatedPassword('');
			// setIsChecked(false);
		} else {
			toast.error(`Unfortunately, we were unable to create an account`);
		}
	};

	return (
		<div className={classes.mainContainer}>
			{error && (
				<div className={classes.error}>
					<AiOutlineClose className={classes.closeBtn} onClick={erorrHandler} />
					<p>The registration form contains errors.</p>
				</div>
			)}
			<form className={classes.registerContainer} onSubmit={onSubmit}>
				<h2>Registration</h2>

				<div
					className={
						nameError
							? `${classes.nameBox} ${classes.inputError}`
							: classes.nameBox
					}>
					<label for='name'>* Your name:</label>
					<input
						name='name'
						id='name'
						value={name}
						onChange={nameHandler}></input>
					{nameError && <p>Please write your name</p>}
				</div>

				<div
					className={
						emailError
							? `${classes.emailBox} ${classes.inputError}`
							: classes.emailBox
					}>
					<label for='email'>* E-mail:</label>
					<input
						name='email'
						id='email'
						value={email}
						onChange={emailHandler}
						autoComplete='email'></input>
					{emailError && <p>Invalid email address format</p>}
					{isEmailExistError && <p>Email already exists in the database</p>}
				</div>
				<div
					className={
						passwordError
							? `${classes.passwordBox} ${classes.inputError}`
							: classes.passwordBox
					}>
					<label for='password'>* Password:</label>
					<input
						name='password'
						id='password'
						type='password'
						value={password}
						onChange={passwordHandler}
						autocomplete='new-password'></input>
					{passwordError && (
						<p>The password must meet the described conditions</p>
					)}
				</div>
				<div
					className={
						repeatedpasswordError
							? `${classes.passwordBox} ${classes.inputError}`
							: classes.passwordBox
					}>
					<label for='repeatPassword'>* Repeat password:</label>
					<input
						name='repeatPassword'
						id='repeatPassword'
						type='password'
						value={repeatedPassword}
						onChange={repeatedPasswordHandler}
						autocomplete='new-password'
					/>
					{repeatedpasswordError && <p>The passwords are different</p>}
				</div>
				<p>Additional information:</p>
				<div className={classes.checkBox}>
					<input
						type='checkbox'
						id='check'
						checked={isChecked}
						onChange={() => setIsChecked(!isChecked)}

						// className={classes.errorCheckBox}
					/>
					<label for='check'>
						I have read the regulations of the online store and accept its
						content.
					</label>
					{errorIsChecked && <p>You have to accept the terms</p>}
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
