import React, { useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../utils/client';
import classes from './Basket.module.css';
import Input from './UI/Input';

const Basket = () => {
	const [isDisabled, setIsDisabled] = useState(true);
	const { cartItems, totalPrice } = useStateContext();
	const [coderError, setCoderError] = useState(false);
	const [codeValue, setCodeValue] = useState('');

	const handleInputChange = (e) => {
		setIsDisabled(e.target.value === '');
		setCodeValue(e.target.value);
	};

	const codeHandler = () => {
		setCoderError(true);
		setCodeValue('');
		setIsDisabled(true);
	};
	console.log(codeValue);
	const buttonCss = !isDisabled ? classes.active : classes.unActive;

	return (
		<div className={classes.wraper}>
			{cartItems.map((item) => (
				<div className={classes.productsContainer} key={item._id}>
					<div className={classes.imageBox}>
						<img
							src={urlFor(item.image[0])}
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
					</div>
					<div>$ {totalPrice}</div>
				</div>
			</div>
			<div className={classes.border}></div>
			<div className={classes.totalPriceBox}>
				<div>
					<p>Sum:</p>
				</div>
				<div>
					<p>$ {totalPrice}</p>
				</div>
			</div>
		</div>
	);
};

export default Basket;
