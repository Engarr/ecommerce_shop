import React from 'react';
import Modal from './Modal';
import { useStateContext } from '../context/StateContext';
import classes from './Cart.module.css';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { urlFor } from '../utils/client';
import { v4 as uuidv4 } from 'uuid';

const Cart = () => {
	const {
		showCart,
		cartHandler,
		cartItems,
		totalPrice,
		toogleItemQuantity,
		onDelete,
	} = useStateContext();
	const length = cartItems.length;
	const newTotalPrice = totalPrice.toFixed(2);
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
						<h4>Your cart is empty</h4>
					</div>
				) : (
					<div className={classes.productsContainer}>
						{cartItems.map((item) => (
							<div className={classes.productContainer} key={uuidv4()}>
								<div className={classes.productBox}>
									<img
										src={urlFor(item.image[0])}
										height={100}
										className={classes.image}
										alt={item.name}
									/>
									<AiOutlineClose
										className={classes.delete}
										onClick={() => onDelete(item._id, item.size)}
									/>
									<div>
										<p className={classes.name}>{item.name}</p>
										<p className={classes.price}>
											<span>Price:</span> ${item.price}
										</p>
										<p className={classes.size}>
											<span>Size:</span> {item.size}
										</p>
										<p>Quantity:</p>
										<div className={classes.qtyBox}>
											<button
												type='button'
												onClick={() =>
													toogleItemQuantity(item._id, 'decrease', item.size)
												}
												className={classes.minus}>
												-
											</button>
											<p> {item.quantity}</p>
											<button
												type='button'
												onClick={() =>
													toogleItemQuantity(item._id, 'increase', item.size)
												}
												className={classes.plus}>
												+
											</button>
										</div>
									</div>
								</div>
							</div>
						))}

						<div className={classes.actionBox}>
							<div className={classes.totalPrice}>
								<p>Total price:</p>
								<p>${newTotalPrice}</p>
							</div>
							<button type='button'>Buy now</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
