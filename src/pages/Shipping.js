import React, { useEffect, useState } from 'react';
import Basket from '../components/Basket';
import Checkout from '../components/Checkout';
import { Link } from 'react-router-dom';
import { shippingCost, paymentMethod } from '../utils/data';
import classes from '../styles/Shipping.module.css';
import { useSelector } from 'react-redux';

const Shipping = () => {
	const [selectedOption, setSelectedOption] = useState('0');
	const [payment, setPayment] = useState('0');
	const [deliveryCost, setDeliveryCost] = useState(
		shippingCost[selectedOption].price || 0
	);
	const email = useSelector((state) => state.form.email);
	const street = useSelector((state) => state.form.street);
	const additional = useSelector((state) => state.form.additional);
	const zipCode = useSelector((state) => state.form.zipCode);
	const city = useSelector((state) => state.form.city);
	

	const handleOption = (e) => {
		setSelectedOption(e.target.value);
	};
	const handlePaymentOption = (e) => {
		setPayment(e.target.value);
	};

	useEffect(() => {
		setDeliveryCost(shippingCost[selectedOption].price);
	}, [selectedOption]);

	return (
		<>
			{/* {city ? ( */}
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
								<div className={classes.shippingMethodsBox} key={item.name}>
									<div className={classes.shippinOptionBox}>
										<input
											type='radio'
											id='option1'
											name='radio-group1'
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

					<div className={classes.mainTitle}>
						<h3>Payment method</h3>
					</div>
					<div className={classes.paymentContainer}>
						{paymentMethod.map((item) => (
							<>
								<div className={classes.paymentMethodsBox}>
									<div className={classes.paymentOptionBox} key={item.name}>
										<input
											type='radio'
											id='payment'
											name='radio-group2'
											value={item.option}
											checked={payment === item.option}
											onChange={handlePaymentOption}
										/>
										<label for='payment'> {item.name}</label>
									</div>

									<div
										className={`${classes.desc} ${
											payment === item.option
												? classes.active
												: classes.unactive
										}`}>
										<p> {item.description}</p>
									</div>
								</div>
							</>
						))}
					</div>

					<div className={classes.nextPageBtn}>
						<Link>
							<button type='submit'>Order now</button>
						</Link>
					</div>
				</div>

				<div className={classes.cartContainer}>
					<Basket deliveryCost={deliveryCost} />
				</div>
			</div>
			{/* // ) : (
			// 	<div className={classes.noShippingDetails}>
			// 		<Link to='/information'>
			// 			<button>Enter shipping details</button>
			// 		</Link>
			// 	</div>
			// )} */}
		</>
	);
};

export default Shipping;
