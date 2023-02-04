import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { client } from '../utils/client';
import { categoryProducts } from '../utils/data';
import classes from '../styles/Home.module.css';
import Product from '../components/Product';

const Home = () => {
	const [products, setProducts] = useState([]);
	const [productOnePcs, setProductOnePcs] = useState([]);
	const maxProducts = products.slice(0, 4);
	const maxProductsOnePcs = productOnePcs.slice(0, 4);
	let category = 'Two pieces';

	useEffect(() => {
		const query = `*[_type == 'product']`;
		client.fetch(query).then((data) => setProducts(data));
	}, []);
	useEffect(() => {
		let query = categoryProducts(category);

		client.fetch(query).then((data) => setProductOnePcs(data));
	}, [category]);

	return (
		<div>
			
			<div className={classes.productsHeading}>
				<h2>Best Seller Products</h2>
				<div>
					<Link to={`/products`}>
						<button className={classes.border}>See all products</button>
					</Link>
				</div>
			</div>
			<div className={classes.container}>
				{maxProducts?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
			<Banner />
			<div className={classes.productsHeading}>
				<h2>Two-pieces swimwear</h2>
				<div>
					<Link to={`/category/${category}`}>
						<button>Look for more</button>
					</Link>
				</div>
			</div>
			<div className={classes.container}>
				{maxProductsOnePcs?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Home;
