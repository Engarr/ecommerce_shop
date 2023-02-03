import React from 'react';
import Transition from 'react-transition-group/Transition';
import { useStateContext } from '../context/StateContext';
import { Link } from 'react-router-dom';



import classes from "./ProfilCard.module.css"



const ProfilCard = ({showProfilCard, logout, profilActionHandler}) => {
    const { isLogin } =
    useStateContext();

    
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
						<div className={`${classes.profilAcctionContainer} ${classesCss}`}>
							{isLogin ? (
								<>
									<div>
										<Link>
											<button>Your account</button>
										</Link>
									</div>
									<div>
										<button type='button' onClick={logout}>
											Logout
										</button>
									</div>
								</>
							) : (
								<>
									<div>
										<Link to='/login'>
											<button type='button' onClick={profilActionHandler}>
												Login
											</button>
										</Link>
									</div>

									<p>Don't have account?</p>

									<div>
										<Link to='/registration'>
											<button type='button' onClick={profilActionHandler}>
												Create account
											</button>
										</Link>
									</div>
								</>
							)}
						</div>
					);
				}}
			</Transition>
		</>
	);
};

export default ProfilCard;
