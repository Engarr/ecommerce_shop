import React from 'react';
import Transition from 'react-transition-group/Transition';
import { Link, Form } from 'react-router-dom';
import {
	AiOutlineLogout,
	AiOutlineUser,
	AiOutlineUserAdd,
} from 'react-icons/ai';

import classes from './ProfilCard.module.css';

const ProfilCard = ({ showProfilCard, profilActionHandler, token }) => {
	const userId = localStorage.getItem('userId');
	return (
		<>
			<Transition in={showProfilCard} mountOnEnter unmountOnExit timeout={200}>
				{(state) => {
					const classesCss = [
						state === 'entered'
							? classes.showUp
							: state === 'exiting'
							? classes.hideUp
							: null,
					];

					return (
						<ul className={`${classes.profilAcctionContainer} ${classesCss}`}>
							{token ? (
								<>
									<li>
										<Link to={`/profil/${userId}`}>
											<button onClick={profilActionHandler}>
												<AiOutlineUser className={classes.icon} />
												<p>Your account</p>
											</button>
										</Link>
									</li>
									<li>
										<Form action='/logout' method='POST'>
											<button onClick={profilActionHandler}>
												<AiOutlineLogout className={classes.icon} />
												<p>Logout</p>
											</button>
										</Form>
									</li>
								</>
							) : (
								<>
									<li>
										<Link to='/login'>
											<button type='button' onClick={profilActionHandler}>
												<AiOutlineUser className={classes.icon} />
												<p>Login</p>
											</button>
										</Link>
									</li>

									<p>Don't have account?</p>

									<li>
										<Link to='/registration'>
											<button type='button' onClick={profilActionHandler}>
												<AiOutlineUserAdd className={classes.icon} />
												<p>Create account</p>
											</button>
										</Link>
									</li>
								</>
							)}
						</ul>
					);
				}}
			</Transition>
		</>
	);
};

export default ProfilCard;
