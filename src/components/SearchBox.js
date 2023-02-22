import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from './Modal';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import classes from './SearchBox.module.css';
import { client } from '../utils/client';
import Product from './Product';

const SearchBox = () => {
	const isSearchVisible = useSelector((state) => state.ui.isSearchVisible);
	const dispatch = useDispatch();
	const searchVisibleHandler = () => {
		dispatch(uiActions.searchHandler());
	};

	const [value, setValue] = useState('');
	const [products, setProducts] = useState([]);

	const valueHandler = async (e) => {
		setValue(e.target.value);
	};

	const searchHandler = async () => {
		if (value !== '') {
			const query = `*[ _type == "product" && name match "^${value.toLowerCase().trim()}*" ]`;
			console.log(query);
			const data = await client.fetch(query);
			console.log(data);
			setProducts(data);
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
					{products.length > 0 &&
						products.map((product) => (
							<Product key={product._id} product={product}  />
						))}
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
