import React from 'react';
import classes from './Product.module.css';
import { urlFor } from '../utils/client';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	
	return (
		<div className={classes.productBox} key={product._id}>
			<Link to={`product/${product?.slug.current}`}>
				<img src={urlFor(product?.image[0]).url()} className={classes.image} />
				<div className={classes.controlBox}>
					<h2>{product?.name}</h2>
					<p>$ {product?.price}</p>
					<button>Buy Now</button>
				</div>
			</Link>
		</div>
	);
};

export default Product;
