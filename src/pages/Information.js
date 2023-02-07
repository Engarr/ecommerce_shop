import React from 'react';
import Checkout from '../components/Checkout';
import classes from '../styles/Information.module.css';

import Basket from '../components/Basket';
const Information = () => {
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
					<div className={classes.box}>
						<div className={classes.inputBox}>
							<input id='name' name='name' required='required' />
							<span htmlFor='name'>Name:</span>
						</div>
						<div className={classes.inputBox}>
							<input id='surname' name='surname' required='required' />
							<span htmlFor='surname'>Surname:</span>
						</div>
					</div>
					<div className={classes.inputBox}>
						<input id='street' name='street' required='required' />
						<span htmlFor='street'>Street and house / apartment number:</span>
					</div>
					<div className={classes.inputBox}>
						<input id='optional' name='optional' required='required' />
						<span htmlFor='optional'>Additional information (optional):</span>
					</div>
					<div className={classes.box}>
						<div className={classes.inputBox}>
							<input id='zip code' name='zip code' required='required' />
							<span htmlFor='zip code'>Zip code:</span>
						</div>
						<div className={classes.inputBox}>
							<input id='city' name='city' required='required' />
							<span htmlFor='city'>City:</span>
						</div>
					</div>
					<div className={classes.inputBox}>
						<input id='tel' name='tel' required='required' />
						<span htmlFor='tel'>Telefon number:</span>
					</div>
					<div></div>
				</div>
				<div className={classes.btn}>
					<button>Choose a delivery method</button>
				</div>
			</div>

			<div className={classes.cartContainer}>
				{/* <Basket /> */}
			</div>
		</div>
	);
};

export default Information;
