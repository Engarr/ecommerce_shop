import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { client } from '../utils/client';
import classes from './Home.module.css';
import Product from '../components/Product';

const Home = () => {
	const [products, setProducts] = useState([]);
	const maxProducts = products.slice(0, 10);

	useEffect(() => {
		const query = `*[_type == 'product']`;
		client.fetch(query).then((data) => setProducts(data));
	}, []);

	return (
		<div>
			<Banner />
			<div className={classes.productsHeading}>
				<h2>Best Seller Products</h2>
				<p>many types of swimwear</p>
			</div>
			<div className={classes.container}>
				{maxProducts?.map((product) => (
					<Product key={product._id} product={product} />
				))}
			</div>
		</div>
	);
};

export default Home;
