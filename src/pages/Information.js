import React, { useState, useEffect } from 'react';
import Checkout from '../components/Checkout';
import classes from '../styles/Information.module.css';
import Input from '../components/UI/Input';
// import { useStateContext } from '../context/StateContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../store/form-slice';


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

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const email = useSelector((state) => state.form.email);
	const name = useSelector((state) => state.form.name);
	const surname = useSelector((state) => state.form.surname);
	const street = useSelector((state) => state.form.street);
	const additional = useSelector((state) => state.form.additional);
	const zipCode = useSelector((state) => state.form.zipCode);
	const city = useSelector((state) => state.form.city);
	const tel = useSelector((state) => state.form.tel);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		dispatch(formActions.updatedField({ field: name, value: value }));
	};

	const validation = () => {
		setErrors({
			email: email === '',
			name: name === '',
			surname: surname === '',
			street: street === '',
			zipCode: zipCode === '',
			city: city === '',
			tel: tel === '' ,
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
			setErrors((prevErrors) => ({
				...prevErrors,
				name: false,
			}));
		}
		if (email !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				email: false,
			}));
		}
		if (surname !== '') {
			setErrors((prevErrors) => ({ ...prevErrors, surname: false }));
		}
		if (street !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				street: false,
			}));
		}
		if (zipCode !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				zipCode: false,
			}));
		}
		if (city !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				city: false,
			}));
		}
		if (tel !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				tel: false,
			}));
		}
	}, [name, email, surname, street, zipCode, city, tel]);

	const onSubmit = (e) => {
		e.preventDefault();

		validation();

		if (isEmailValid() && !Object.values(errors).some((error) => error)) {
			navigate('/shipping');
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
							data={'email'}
							value={email}
							onChange={handleInputChange}
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
							onChange={handleInputChange}
							message={'Enter your name'}
							error={errors.name}
							value={name}
						/>

						<Input
							text={`Surname:`}
							data={'surname'}
							value={surname}
							onChange={handleInputChange}
							message={'Enter your surname'}
							error={errors.surname}
						/>
					</div>

					<Input
						text={`Street and house / apartment number:`}
						data={'street'}
						value={street}
						onChange={handleInputChange}
						message={'Enter your street adress'}
						error={errors.street}
					/>

					<Input
						text={`Additional information (optional):`}
						onChange={handleInputChange}
						value={additional}
						data={'additional'}
					/>

					<div className={classes.box}>
						<Input
							text={`Zip code:`}
							data={'zipCode'}
							value={zipCode}
							onChange={handleInputChange}
							message={'Enter your zip code'}
							error={errors.zipCode}
						/>
						<Input
							text={`City`}
							data={'city'}
							value={city}
							onChange={handleInputChange}
							message={'Enter your city name'}
							error={errors.city}
						/>
					</div>

					<Input
						text={`Telefon number:`}
						data={'tel'}
						value={tel}
						onChange={handleInputChange}
						message={'Enter your telefon number'}
						error={errors.tel}
						maxLength='9'
					/>
					<div className={classes.btn}>
						<button type='submit'>Choose a delivery method</button>
					</div>
				</form>
			</div>

			<div className={classes.cartContainer}>
				<Basket deliveryCost={0} />
			</div>
		</div>
	);
};

export default Information;
