import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { MdKeyboardArrowDown } from 'react-icons/md';
import classes from '../styles/Products.module.css';
import Product from '../components/Product';
import { fetchProducts } from '../utils/fetch-products';

const Products = () => {
	const [productsData, setProductsData] = useState([]);
	const [sortCriteria, setSortCriteria] = useState('recommended');

	const { category } = useParams();

	const fetchProductsData = async (categoryParam) => {
		const productsData = await fetchProducts(categoryParam);
		setProductsData(productsData);
	};
	useEffect(() => {
		fetchProductsData(category);
		// eslint-disable-next-line
	}, [category]);

	let sortedProducts = [...productsData];

	if (sortCriteria === 'recomended') {
		sortedProducts = [...productsData];
	} else if (sortCriteria === 'alphabetically, A-Z') {
		sortedProducts.sort((a, b) => {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		});
	} else if (sortCriteria === 'price ascending') {
		sortedProducts.sort((a, b) => a.price - b.price);
	} else if (sortCriteria === 'price descending') {
		sortedProducts.sort((a, b) => b.price - a.price);
	}

	if (productsData.length === 0)
		return (
			<div className={classes.loading}>
				<Spinner message='Loading...' />
			</div>
		);

	return (
		<div className={classes.container}>
			<div className={classes.optionsContainer}>
				<h2>{category ? category : 'All products'}</h2>

				<div className={classes.sortingBox}>
					<MdKeyboardArrowDown className={classes.arrow} />
					<label>Sorting options:</label>
					<select
						name='sorting'
						id='sorting'
						value={sortCriteria}
						onChange={(e) => setSortCriteria(e.target.value)}>
						<option value='recommended' className={classes.option}>
							Recomended
						</option>
						<option value='alphabetically, A-Z'>Alphabetically, A-Z</option>
						<option value='alphabetically, Z-A'>Alphabetically, Z-A</option>
						<option value='price ascending'>Price ascending</option>
						<option value='price descending'>Price descending</option>
					</select>
				</div>
			</div>
			<div className={classes.productContainer}>
				{productsData &&
					sortedProducts?.map((product) => (
						<Product product={product} key={product._id} />
					))}
			</div>
		</div>
	);
};

export default Products;
