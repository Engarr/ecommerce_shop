import React, { useState, useEffect } from 'react';
import Checkout from '../components/Checkout';
import classes from '../styles/Information.module.css';
import Input from '../components/UI/Input';
import { useStateContext } from '../context/StateContext';

import Basket from '../components/Basket';
const Information = () => {
	const [errors, setErrors] = useState({
		name: false,
		email: false,
		surname: false,
		street: false,
		zipCode: false,
		city: false,
		tel: false,
	});

	const {
		emailHandler,
		nameHandler,
		surnameHandler,
		streetHandler,
		zipCodeHandler,
		cityHandler,
		telHandler,
		name,
		surname,
		city,
		tel,
		zipCode,
		street,

		email,
	} = useStateContext();

	const validation = () => {
		setErrors({
			name: name === '',
			email: email === '',
			surname: surname === '',
			street: street === '',
			zipCode: zipCode === '',
			city: city === '',
			tel: tel === '',
		});
	};

	const isEmailValid = () => {
		let isValid = true;
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!re.test(email)) {
			isValid = false;
		}

		return isValid;
	};
	useEffect(() => {
		if (name !== '') {
			setErrors({
				...errors,
				name: false,
			});
		}
		if (email !== '') {
			setErrors({
				...errors,
				email: false,
			});
		}
		if (surname !== '') {
			setErrors({ ...errors, surname: false });
		}
		if (street !== '') {
			setErrors({
				...errors,
				street: false,
			});
		}
		if (zipCode !== '') {
			setErrors({
				...errors,
				zipCode: false,
			});
		}
		if (city !== '') {
			setErrors({
				...errors,
				city: false,
			});
		}
		if (tel !== '') {
			setErrors({
				...errors,
				tel: false,
			});
		}
	}, [name, email, surname, street, zipCode, city, tel]);

	const onSubmit = (e) => {
		e.preventDefault();

		validation();

		if (isEmailValid() && !Object.values(errors).some((error) => error)) {
			console.log('Validation passed');
		} else {
			console.log('Validation failed');
		}
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.informationContainer}>
				<Checkout stepOne />
				<form className={classes.adressContainer} onSubmit={onSubmit}>
					<h2>Contact details:</h2>
					<div>
						<Input
							text={`E-mail:`}
							data={'contactDetails'}
							onChange={emailHandler}
							oninvalid={'name'}
							message={'Enter your Email'}
							error={errors.email}
						/>

						<input
							type='checkbox'
							name='newsletter'
							id='newsletter'
							className={classes.checkBox}
						/>
						<label htmlFor='newsletter'>
							Subscribe to the newsletter and inform me about upcoming
							promotions
						</label>
					</div>
					<h2>Shipping address:</h2>
					<div className={classes.box}>
						<Input
							text={`Name:`}
							data={'name'}
							onChange={nameHandler}
							message={'Enter your name'}
							error={errors.name}
						/>

						<Input
							text={`Surname:`}
							data={'surname'}
							onChange={surnameHandler}
							message={'Enter your surname'}
							error={errors.surname}
						/>
					</div>

					<Input
						text={`Street and house / apartment number:`}
						data={'street'}
						onChange={streetHandler}
						message={'Enter your street adress'}
						error={errors.street}
					/>

					<Input
						text={`Additional information (optional):`}
						data={'optional'}
					/>

					<div className={classes.box}>
						<Input
							text={`Zip code:`}
							data={'zip code'}
							onChange={zipCodeHandler}
							message={'Enter your zip code'}
							error={errors.zipCode}
						/>
						<Input
							text={`City`}
							data={'city'}
							onChange={cityHandler}
							message={'Enter your city name'}
							error={errors.city}
						/>
					</div>

					<Input
						text={`Telefon number:`}
						data={'tel'}
						onChange={telHandler}
						message={'Enter your telefon number'}
						error={errors.tel}
					/>
					<div className={classes.btn}>
						<button type='submit'>Choose a delivery method</button>
					</div>
				</form>
			</div>

			<div className={classes.cartContainer}>
				<Basket />
			</div>
		</div>
	);
};

export default Information;
