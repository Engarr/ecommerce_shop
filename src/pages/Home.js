import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';
import { client, urlFor } from '../utils/client';
import classes from './Home.module.css';
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
					<div className={classes.productBox} key={product._id}>
						<img
							src={urlFor(product?.image[0]).url()}
							className={classes.image}
						/>
						<div className={classes.controlBox}>
							<h2>{product?.name}</h2>
							<p>$ {product?.price}</p>
							<button>Buy Now</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
