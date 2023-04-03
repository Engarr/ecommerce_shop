import React, { useState } from 'react';
import classes from './UpdateData.module.css';
import Input from '../UI/Input';
import { IoReturnUpForward } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';

const UpdateData = ({ optionHandler }) => {
	const [isActiveChangePsw, setIsActiveChangePsw] = useState(false);
	const [isActiveChangeEmail, setIsActiveChangeEmail] = useState(false);
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
	};
	const activeEmailHandler = () => {
		setIsActiveChangeEmail((prev) => (prev = !prev));
	};

	const cssStylePw = isActiveChangePsw ? classes.active : '';
	const cssStyleEmail = isActiveChangeEmail ? classes.active : '';

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
					<div className={classes.passwordBox}>
						<div className={classes.changeTitle}>
							<p>Change password:</p>
							<MdKeyboardArrowDown
								className={classes.icon}
								onClick={activePswHandler}
							/>
						</div>

						<div className={`${classes.inputBox} ${cssStylePw}`}>
							<Input
								data='email'
								placeholder='E-mail'
								text='Your E-mail:'
								type='text'
								onChange={newPasswordHandler}
							/>

							<Input
								data='newPassword'
								placeholder='New password'
								text='New password:'
								type='text'
								onChange={newPasswordHandler}
							/>

							<Input
								data='repeatNewPassword'
								placeholder='Repeat new password'
								text='Repeat new password:'
								type='text'
								onChange={newPasswordHandler}
							/>
							<div className={classes.btn}>
								<button className={classes.btn}>Change password</button>
							</div>
						</div>
					</div>

					<div className={classes.emailBox}>
						<div className={classes.changeTitle}>
							<p>Change E-mail</p>
							<MdKeyboardArrowDown
								className={classes.icon}
								onClick={activeEmailHandler}
							/>
						</div>

						<div className={`${classes.inputBox} ${cssStyleEmail}`}>
							<Input
								data='newEmail'
								placeholder='New e-mail'
								text='New e-mail:'
								type='text'
								onChange={newEmailHandler}
							/>
							<Input
								data='password'
								placeholder='password'
								text='Password:'
								type='text'
								onChange={newEmailHandler}
							/>
							<div className={classes.btn}>
								<button>Change e-mail</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UpdateData;
