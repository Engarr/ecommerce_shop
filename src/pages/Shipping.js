import React, { useEffect, useState } from 'react';
import Basket from '../components/Basket';
import { useStateContext } from '../context/StateContext';
import Checkout from '../components/Checkout';
import { Link } from 'react-router-dom';
import { shippingCost } from '../utils/data';
import classes from '../styles/Shipping.module.css';

const Shipping = () => {
	const { city, zipCode, street, additional, email } = useStateContext();
	const [selectedOption, setSelectedOption] = useState('0');
	const [deliveryCost, setDeliveryCost] = useState(
		shippingCost[selectedOption].price || 0
	);

	const handleOption = (e) => {
		setSelectedOption(e.target.value);
	};

	useEffect(() => {
		setDeliveryCost(shippingCost[selectedOption].price);
	}, [selectedOption]);

	return (
		<div className={classes.wrapper}>
			<div className={classes.shippingContainer}>
				<Checkout stepTwo />

				<div className={classes.shippingDataContainer}>
					<div className={classes.shippingDataBox}>
						<div className={classes.title}>
							<p>Contact:</p>
						</div>
						<div className={classes.data}>
							<p>{email}</p>
						</div>
						<div>
							<Link to='/information'>
								<button className={classes.btn}>Edit</button>
							</Link>
						</div>
					</div>
					<div className={classes.border}></div>
					<div className={classes.shippingDataBox}>
						<div className={classes.title}>
							<p>Delivery address:</p>
						</div>
						<div className={classes.data}>
							<p>{street},</p>
							{additional && <p>{additional},</p>}
							<p>{zipCode},</p>
							<p>{city},</p>
							<p>Polska</p>
						</div>
						<div>
							<Link to='/information'>
								<button className={classes.btn}>Edit</button>
							</Link>
						</div>
					</div>
				</div>

				<div className={classes.mainTitle}>
					<h3>Delivery</h3>
					<p>shipping methods</p>
				</div>
				<div className={classes.deliveryContainer}>
					{shippingCost.map((item) => (
						<>
							<div className={classes.shippingMethodsBox}>
								<div className={classes.shippinOptionBox}>
									<input
										type='radio'
										id='option1'
										name='radio-group'
										value={item.option}
										checked={selectedOption === item.option}
										onChange={handleOption}
									/>
									<label for='radio1'> {item.name}</label>
								</div>
								<div>
									<p>$ {item.price}</p>
								</div>
							</div>
						</>
					))}
				</div>
				<div className={classes.nextPageBtn}>
					<Link>
						<button type='submit'>Choose payment method</button>
					</Link>
				</div>
			</div>

			<div className={classes.cartContainer}>
				<Basket deliveryCost={deliveryCost} />
			</div>
		</div>
	);
};

export default Shipping;
