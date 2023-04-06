import React, { useState } from 'react';
import classes from './Basket.module.css';
import Input from './UI/Input';
import { useSelector } from 'react-redux';

const Basket = ({ deliveryCost }) => {
	const [isDisabled, setIsDisabled] = useState(true);
	const [coderError, setCoderError] = useState(false);
	const [codeValue, setCodeValue] = useState('');

	const totalPrice = useSelector((state) => {
		return state.cartItems.items.reduce((total, item) => {
			return total + item.price * item.quantity;
		}, 0);
	});
	const cartItems = useSelector((state) => state.cartItems.items);
	const handleInputChange = (e) => {
		setIsDisabled(e.target.value === '');
		setCodeValue(e.target.value);
	};

	const codeHandler = () => {
		setCoderError(true);
		setCodeValue('');
		setIsDisabled(true);
	};
	const totalCost = (totalPrice + deliveryCost).toFixed(2);
	const buttonCss = !isDisabled ? classes.active : classes.unActive;

	return (
		<div className={classes.wraper}>
			{cartItems.map((item) => (
				<div className={classes.productsContainer} key={item._id}>
					<div className={classes.imageBox}>
						<img
							src={item.imageUrl}
							height={100}
							width={100}
							className={classes.image}
							alt={item.name}
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

			<div className={classes.border}></div>

			<div className={classes.codeBox}>
				<Input
					onChange={handleInputChange}
					text={'Promo code'}
					data={'code'}
					error={coderError}
					value={codeValue}
				/>

				<button
					type='button'
					disabled={isDisabled}
					className={buttonCss}
					onClick={codeHandler}>
					Add
				</button>
			</div>
			{coderError && (
				<div className={classes.errorBox}>
					<p>No promo code found</p>
				</div>
			)}

			<div className={classes.border}></div>
			<div className={classes.sumaryBox}>
				<div className={classes.sumaryPrice}>
					<div>
						<p>Cost of products</p>
						{deliveryCost !== 0 ? <p>Shipping cost</p> : ''}
					</div>
					<div>
						<p>$ {totalPrice.toFixed(2)}</p>
						{deliveryCost !== 0 ? <p>$ {deliveryCost.toFixed(2)}</p> : ''}
					</div>
				</div>
			</div>
			<div className={classes.border}></div>
			<div className={classes.totalPriceBox}>
				<div>
					<p>Sum:</p>
				</div>
				<div>
					<p>$ {totalCost}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;
