import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from './Modal';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import classes from './SearchBox.module.css';
import Product from './Product';
import Spinner from '../components/Spinner';

const SearchBox = () => {
	const isSearchVisible = useSelector((state) => state.ui.isSearchVisible);
	const dispatch = useDispatch();
	const searchVisibleHandler = () => {
		dispatch(uiActions.searchHandler());
	};

	const [value, setValue] = useState('');
	const [products, setProducts] = useState('');
	const [isProducts, setIsProducts] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const valueHandler = async (e) => {
		setValue(e.target.value);
	};
	const searchHandler = async () => {
		if (value !== '') {
			setIsLoading(true);
			const response = await fetch(
				`http://localhost:8080/feed/search/${value}`
			);
			const data = await response.json();
			const products = data.products;
			if (response.ok) {
				const prefix = `http://localhost:8080/`;
				const newArr = products.map((element) => ({
					...element,
					imageUrl: prefix + element.imageUrl[0],
				}));
				setProducts(newArr);
				setIsProducts(true);

				if (products.length === 0) {
					setIsProducts(false);
				}
				setIsLoading(false);
			} else {
				console.log('error');
			}
		} else {
			setProducts([]);
		}
	};
	useEffect(() => {
		searchHandler();
		// eslint-disable-next-line
	}, [value]);

	return (
		<div>
			<Modal show={isSearchVisible} handler={searchVisibleHandler} />
			<div className={classes.mainContainer}>
				<div className={classes.SearchBox}>
					<div className={classes.inputBox}>
						<IoIosSearch className={classes.icon} />
						<input placeholder='Search' value={value} onChange={valueHandler} />
					</div>
					<div>
						<AiOutlineClose
							className={classes.closeIcon}
							onClick={searchVisibleHandler}
						/>
					</div>
				</div>

				<div className={classes.productsContainer}>
					{isLoading ? (
						<div className={classes.SpinerBox}>
							<Spinner message='Loading...' />
						</div>
					) : (
						<div className={classes.productContainer}>
							{products.length > 0 &&
								products.map((product) => (
									<Product key={product._id} product={product} />
								))}
							{!isProducts && (
								<div className={classes.searchError}>
									<p>Unfortunately, no products could be found</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
