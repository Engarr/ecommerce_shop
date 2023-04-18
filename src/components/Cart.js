import React from 'react';
import Modal from './Modal';
import classes from './Cart.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { cartItemActions } from '../store/cartItems-slice';
import store from '../store/index';

const Cart = ({ cartCssStyle, showCartHandler }) => {
	const dispatch = useDispatch();

	const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);

	const cartItems = useSelector((state) => state.cartItems.items);
	const totalPrice = useSelector((state) => {
		return state.cartItems.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	});
	const updateLocalStorage = () => {
		localStorage.setItem(
			'cartItems',
			JSON.stringify(store.getState().cartItems)
		);
	};
	const handleIncreaseQty = (id) => {
		dispatch(cartItemActions.increaseQuantity(id));
		updateLocalStorage();
	};
	const handleDecreaseQty = (id) => {
		dispatch(cartItemActions.decreaseQuantity(id));
		updateLocalStorage();
	};
	const removeItem = (id) => {
		dispatch(cartItemActions.removeItem(id));
		updateLocalStorage();
	};

	const length = cartItems.length;
	return (
		<div>
			<Modal show={cartIsVisible} handler={showCartHandler} />(
			<div className={`${classes.cartContainer} ${cartCssStyle}`}>
				<div className={classes.controlPanel}>
					<AiOutlineClose
						className={classes.closeBtn}
						onClick={showCartHandler}
					/>
					<Link to='/' onClick={showCartHandler}>
						<p>WOSMOD</p>
					</Link>
				</div>
				{length === 0 ? (
					<div className={classes.emptyText}>
						<h4>Your cart is empty</h4>
					</div>
				) : (
					<div className={classes.productsContainer}>
						{cartItems.map((item) => (
							<div className={classes.productContainer} key={uuidv4()}>
								<div className={classes.productBox}>
									<img
										src={item.imageUrl}
										height={100}
										width={100}
										className={classes.image}
										alt={item.name}
									/>
									<AiOutlineClose
										className={classes.delete}
										onClick={() => removeItem(item._id)}
									/>
									<div>
										<p className={classes.name}>{item.name}</p>

										<p className={classes.size}>
											<span>Size:</span> {item.size}
										</p>

										<div className={classes.qtyBox}>
											<button
												type='button'
												onClick={() => handleDecreaseQty(item._id)}
												className={classes.minus}>
												-
											</button>
											<p> {item.quantity}</p>
											<button
												type='button'
												onClick={() => handleIncreaseQty(item._id)}
												className={classes.plus}>
												+
											</button>
										</div>
										<p className={classes.price}>${item.price.toFixed(2)}</p>
									</div>
								</div>
							</div>
						))}

						<div className={classes.actionBox}>
							<div className={classes.totalPrice}>
								<div>
									<p>Total price:</p>
								</div>
								<div>
									<p>${totalPrice.toFixed(2)}</p>
								</div>
							</div>
							<Link to='/information'>
								<button type='button' onClick={showCartHandler}>
									Buy now
								</button>
							</Link>
						</div>
					</div>
				)}
			</div>
			)
		</div>
	);
};

export default Cart;
