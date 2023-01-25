import React from 'react';
import classes from './Product.module.css';
import { urlFor } from '../utils/client';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	// const [index, setIndex] = useState(0);

	const handleClick = () => {
		window.scrollTo(0, 0);
	};
	

	return (
		<div>
			<Link to={`/product/${product?.slug.current}`} onClick={handleClick}>
				<div className={classes.productCard}>
					<img
						src={urlFor(product?.image[0]).url()}
						alt={product?.name}
						width={250}
						height={250}
						className={classes.productImage}
						
						
					/>
					<p className={classes.productName}>{product?.name}</p>
					<p className={classes.productPrice}>$ {product?.price}</p>
				</div>
			</Link>
		</div>
	);
};

export default Product;
