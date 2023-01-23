import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { client } from '../utils/client';
import classes from './Home.module.css';
import Product from '../components/Product';

const Home = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const query = `*[_type == 'product']`;
		client.fetch(query).then((data) => setProducts(data));
	}, []);

	return (
		<div>
			<Banner />
			<div className={classes.container}>
				{products?.map((product) => (
					<Product key={product._id} product={product}/>
					
				))}
			</div>
		</div>
	);
};

export default Home;
