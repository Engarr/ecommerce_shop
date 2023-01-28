import React, {useState} from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import classes from "../styles/Registration.module.css"
const Registration = () => {
  const [error, setError] = useState(false);

  const erorrHandler = () => {
		setError(false);
	};







	return (
		<div className={classes.mainContainer}>
			{error && (
				<div className={classes.error}>
					<AiOutlineClose className={classes.closeBtn} onClick={erorrHandler} />
					<p>The registration form contains errors.</p>
				</div>
			)}
      <form className={classes.registerContainer}>

      <h2>Registration</h2>
				<div className={classes.nameBox}>
					<label for='name'>* Your name:</label>
					<input name='name' id='name'></input>
				</div>
				<div className={classes.emailBox}>
					<label for='email'>* E-mail:</label>
					<input name='email' id='email' value=''></input>
				</div>
				<div className={classes.passwordBox}>
					<label for='password'>* Password:</label>
					<input name='password' id='password'></input>
				</div>
				<div className={classes.passwordBox}>
					<label for='repeatPassword'>* Repeat password:</label>
					<input name='repeatPassword' id='repeatPassword'></input>
				</div>
				<p>Additional information:</p>
				<div className={classes.checkBox}>
					<input type='checkbox'></input>
					<label>
						I have read the regulations of the online store and accept its
						content.
					</label>
				</div>
				<div>
					<button>Register</button>
				</div>
        <div className={classes.moreInfoBox}>
          * Password should to contain min 8 characters one digital and one special character 
        </div>
			</form>
		</div>
	);
};

export default Registration;
