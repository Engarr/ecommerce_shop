import React from 'react';
import classes from './Checkout.module.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
const Checkout = ({ stepOne, stepTwo, stepThree }) => {
	return (
		<>
			{stepOne ? (
				<div className={classes.checkoutContainer}>
					<p className={classes.unActive}>Cart</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.active}>Contact info</p>
					<MdOutlineKeyboardArrowRight className={classes.active} />
					<p className={classes.unActive}>Shipping method</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.unActive}>Payment method</p>
				</div>
			) : (
				''
			)}
			{stepTwo ? (
				<div className={classes.checkoutContainer}>
					<p className={classes.unActive}>Cart</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.unActive}>Contact info</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.active}>Shipping method</p>
					<MdOutlineKeyboardArrowRight className={classes.active} />
					<p className={classes.unActive}>Payment method</p>
				</div>
			) : (
				''
			)}
			{stepThree ? (
				<div className={classes.checkoutContainer}>
					<p className={classes.unActive}>Cart</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.unActive}>Contact info</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.unActive}>Shipping method</p>
					<MdOutlineKeyboardArrowRight className={classes.unActive} />
					<p className={classes.active}>Payment method</p>
				</div>
			) : (
				''
			)}
		</>
	);
};

export default Checkout;
