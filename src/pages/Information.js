import React from 'react';
import Checkout from '../components/Checkout';
import classes from '../styles/Information.module.css';

const CartPage = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.informationContainer}>
				<Checkout stepOne />
				<div className={classes.adressContainer}>
					<h2>Contact details:</h2>
					<div>
						<div className={classes.inputBox}>
							<input
								name='contactDetails'
								id='contactDetails'
								required='required'
							/>
							<span>E-mail:</span>
						</div>

						{/* <label for='newsletter'>
							Subscribe to the newsletter and inform me about upcoming
							promotions
						</label>
						<input type='checkbox' name='newsletter' id='newsletter' /> */}
					</div>
					<h2>Shipping address:</h2>
					<div className={classes.nameBox}>
						<div className={classes.inputBox}>
							<input id='name' name='name' required='required' />
							<span for='name'>Name:</span>
						</div>
						<div className={classes.inputBox}>
							<input id='surname' name='surname' required='required' />
							<span for='surname'>Surname:</span>
						</div>
					</div>
					<div></div>
				</div>
			</div>

			<div className={classes.cartContainer}>
				<div>Koszyk Infro</div>
			</div>
		</div>
	);
};

export default CartPage;
