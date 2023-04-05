import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from '../styles/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Input from '../components/UI/Input';

const Login = () => {
	const navigate = useNavigate();

	const [errors, setErrors] = useState({
		error: false,
		email: false,
		password: false,
	});
	const [formData, setFormData] = useState({
		password: '',
		email: '',
	});
	const [backendErrors, setBackendErrors] = useState({
		email: '',
		password: '',
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

	const onLogin = async (e) => {
		e.preventDefault();
		if (validation()) {
			try {
				const response = await fetch('http://localhost:8080/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: formData.email,
						password: formData.password,
					}),
				});
				const data = await response.json();
				if (response.ok) {
					const token = data.token;
					localStorage.setItem('token', token);
					localStorage.setItem('userId', data.userId);
					navigate('/');
					toast.success(`Welcome ${data.name}`);
				} else {
					const errorObject = {};
					data.errors.forEach((error) => {
						errorObject[error.param] = error.msg;
					});
					setBackendErrors(errorObject);
				}
			} catch (err) {
				console.log('Error loggingin:', err);
				toast.error('Login failed');
			}
		}
	};

	return (
		<div className={classes.mainContainer}>
			<form className={classes.loginContainer} onSubmit={onLogin}>
				<h2>LOGIN</h2>
				<div className={classes.box}>
					<Input
						data='email'
						text='E-mail:'
						type='text'
						placeholder='E-mail'
						onChange={formDataHandler}
						error={errors.email}
					/>
					{(errors.email && <p>Please enter your email.</p>) ||
						(backendErrors.email && <p>{backendErrors.email}</p>)}
				</div>
				<div className={classes.box}>
					<Input
						data='password'
						text='Password:'
						type='password'
						placeholder='Password'
						onChange={formDataHandler}
						error={errors.password}
					/>
					{(errors.password && <p>Please enter your password.</p>) ||
						(backendErrors.password && <p>{backendErrors.password}</p>)}
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
