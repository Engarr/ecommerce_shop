import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import bcrypt from 'bcryptjs';
import { loginUser } from '../utils/data';
import { client } from '../utils/client';
import classes from '../styles/Login.module.css';
import { useStateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
	const [error, setError] = useState(false);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const { userData, setUserData } = useStateContext();
	const navigate = useNavigate();
	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const emailHandler = (e) => {
		setEmail(e.target.value);
	};

	const erorrHandler = () => {
		setError(false);
	};
	const isPasswordValid = () => {
		let isValid = true;
		if (password.length < 8) {
			isValid = false;
		}
		// if (!/\d/.test(password)) {
		// 	isValid = false;
		// }

		// if (!/[!@#$%^&*()+=._-]/.test(password)) {
		// 	isValid = false;
		// } else {
		// }
		return isValid;
	};
	const isEmailValid = () => {
		let isValid = true;
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re.test(email)) {
			isValid = false;
		} else {
		}
		return isValid;
	};

	const onLoginHandler = async (e) => {
		e.preventDefault();

		if (isPasswordValid() && isEmailValid()) {
			try {
				const query = loginUser(email);
				const response = await client.fetch(query);
				const data = response[0].password;

				const match = await bcrypt.compare(password, data);
				if (!match) {
					setError(true);
					setPassword('');
				}
				if (match) {
					setEmail('');
					setPassword('');
					setUserData(response);

					toast.success(
						`You have successfully logged in. Welcome ${userData[0].name}!`
					);
					navigate('/home');
				}
			} catch {
				setError(true);
			}
		} else {
			setError(true);
		}
	};

	return (
		<div className={classes.mainContainer}>
			{error && (
				<div className={classes.error}>
					<AiOutlineClose className={classes.closeBtn} onClick={erorrHandler} />
					<p>Invalid login details.</p>
				</div>
			)}

			<form className={classes.loginContainer} onSubmit={onLoginHandler}>
				<h2>Lgoin</h2>
				<div className={classes.emailBox}>
					<label for='e-mail'> E-mail:</label>

					<input
						name='e-mail'
						id='e-mail'
						onChange={emailHandler}
						value={email}
						autoComplete='off'></input>
				</div>
				<div className={classes.passwordBox}>
					<label for='password'> Password:</label>

					<input
						type='password'
						name='password'
						id='password'
						onChange={passwordHandler}
						value={password}
						autoComplete='off'></input>
				</div>
				<button type='submit'>Login</button>
				<div className={classes.createAccountBox}>
					<p>Don't have account?</p>
					<Link to='/registration'>
						<button>Create account</button>
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
