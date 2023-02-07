import React from 'react';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../utils/client';
import classes from './Basket.module.css';

const Basket = () => {
	const { cartItems, totalPrice, toogleItemQuantity, onDelete } =
		useStateContext();
	// console.log(cartItems);

	return (
		<div className={classes.wraper}>
			{cartItems.map((item) => (
				<div className={classes.productsContainer}>
					<div className={classes.imageBox}>
						<img
							src={urlFor(item.image[0])}
							height={100}
							width={100}
							className={classes.image}
						/>
						<div className={classes.qtyBox}>
							<p>{item.quantity}</p>
						</div>
						<div className={classes.productName}>
							<h3>{item.name}</h3>
							<p>Size: {item.size}</p>
						</div>
					</div>

					<div className={classes.priceBox}>
						<p>$ {item.price}</p>
					</div>
				</div>
			))}

			<div></div>
			<div></div>
			<div></div>
			<div className={classes.border}></div>
			<div className={classes.totalPriceBox}>
				<div>
					<p>Sum:</p>
				</div>
				<div>
					<p>USD {totalPrice}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;
