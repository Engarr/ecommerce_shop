import React, { useEffect, useState } from 'react';
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
	const { setUserData, setIsLogin } = useStateContext();
	const navigate = useNavigate();

	const erorrHandler = () => {
		setErrors((prevError) => ({
			...prevError,
			error: false,
		}));
	};

	const [errors, setErrors] = useState({
		error: false,
		email: false,
		password: false,
	});
	const [formData, setFormData] = useState({
		password: '',
		email: '',
	});
	const formDataHandler = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const isPasswordValid = () => {
		let isValid = true;
		if (formData.password.length < 8) {
			isValid = false;
		}
		if (!/\d/.test(formData.password)) {
			isValid = false;
		}

		if (!/[!@#$%^&*()+=._-]/.test(formData.password)) {
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
	const validation = () => {
		let isValid = true;
		if (!isEmailValid()) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				email: true,
			}));
		}
		if (!isPasswordValid()) {
			isValid = false;
			setErrors((prevError) => ({
				...prevError,
				password: true,
			}));
		}
		return isValid;
	};

	useEffect(() => {
		if (formData.email !== '') {
			setErrors((prevError) => ({
				...prevError,
				email: false,
			}));
		}
		if (formData.password !== '') {
			setErrors((prevError) => ({
				...prevError,
				password: false,
			}));
		}
	}, [formData]);

	const onLoginHandler = async (e) => {
		e.preventDefault();

		if (validation()) {
			try {
				const query = loginUser(formData.email);
				const response = await client.fetch(query);
				const data = response[0].password;

				const match = await bcrypt.compare(formData.password, data);
				if (!match) {
					setErrors((prevError) => ({
						...prevError,
						error: true,
					}));
				}
				if (match) {
					setUserData({
						name: response[0].name,
						email: response[0].email,
					});
					setIsLogin(true);
					setFormData({
						password: '',
						email: '',
					});

					toast.success(
						`You have successfully logged in. Welcome ${response[0].name}!`
					);
					navigate('/home');
				}
			} catch {
				setErrors((prevError) => ({
					...prevError,
					error: true,
				}));
			}
		} else {
			setErrors((prevError) => ({
				...prevError,
				error: true,
			}));
		}
	};

	return (
		<div className={classes.mainContainer}>
			{errors.error && (
				<div className={classes.error}>
					<AiOutlineClose className={classes.closeBtn} onClick={erorrHandler} />
					<p>Invalid login details.</p>
				</div>
			)}

			<form className={classes.loginContainer} onSubmit={onLoginHandler}>
				<h2>LOGIN</h2>
				<div className={classes.emailBox}>
					<label htmlFor='email'> E-mail:</label>

					<input
						name='email'
						id='email'
						onChange={formDataHandler}
						value={formData.email}
						autoComplete='off'
						className={errors.email ? classes.inputError : ''}></input>
					{errors.email && <p>Please enter your email.</p>}
				</div>
				<div className={classes.passwordBox}>
					<label htmlFor='password'> Password:</label>

					<input
						type='password'
						name='password'
						id='password'
						onChange={formDataHandler}
						value={formData.password}
						autoComplete='off'
						className={errors.password ? classes.inputError : ''}></input>
					{errors.password && <p>Please enter your password.</p>}
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
