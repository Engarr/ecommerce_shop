import React, { useEffect, useState } from 'react';
import { client, urlFor } from '../utils/client';
import { categoryProducts } from '../utils/data';
import { useParams, Link } from 'react-router-dom';
import classes from '../styles/Products.module.css';
import Spinner from '../components/Spinner';

const Products = () => {
	const [productsData, setProductsData] = useState([]);

	const { category } = useParams();

	useEffect(() => {
		let query = categoryProducts(category);
		client.fetch(query).then((data) => setProductsData(data));
	}, [category]);
	
	if (!productsData) return <Spinner message='Loading...' />;

	return (
		<div className={classes.container}>
			<div className={classes.optionsContainer}>Sorting opctions</div>
			<div className={classes.productContainer}>
				{productsData &&
					productsData?.map((product) => (
						<div className={classes.productBox}>
							<Link to={`/product/${product?.slug.current}`}>
								<div>
									<img
										src={urlFor(product?.image[0]).url()}
										className={classes.image}
										alt={product.name}
									/>
									<h3>{product.name}</h3>
									<p>
										<span>$</span> {product.price}
									</p>
								</div>
							</Link>
						</div>
					))}
			</div>
		</div>
	);
};

export default Products;
