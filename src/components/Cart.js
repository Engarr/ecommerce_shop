import React from 'react';
import Modal from './Modal';
import { useStateContext } from '../context/StateContext';
import classes from './Cart.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Cart = () => {
	const { showCart, cartHandler, cartItems } = useStateContext();
	const length = cartItems.length;
	return (
		<div>
			<Modal showCart={showCart} cartHandler={cartHandler} />
			<div className={classes.cartContainer}>
				<div className={classes.controlPanel}>
					<AiOutlineClose className={classes.closeBtn} onClick={cartHandler} />
					<Link to='/' onClick={cartHandler}>
						<p>WOSMOD</p>
					</Link>
				</div>
				{length === 0 ? (
					<div className={classes.emptyText}>
						<h4>Twój koszyk jest pusty.</h4>
					</div>
				) : (
					<div></div>
				)}
			</div>
		</div>
	);
};

export default Cart;
