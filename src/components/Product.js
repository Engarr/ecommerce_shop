import React, { useState } from 'react';
import classes from './Product.module.css';
import { urlFor } from '../utils/client';
import { Link } from 'react-router-dom';
import Transition from 'react-transition-group/Transition';

const Product = ({ product }) => {
	const [isActive, setIsActive] = useState(false);
	
	const handleClick = () => {
		window.scrollTo(0, 0);
	};

	const activeHandler = () => {
		setIsActive((prev) => (prev = !prev));
	};
	return (
		<div>
			<div
				className={classes.productCard}
				onMouseEnter={activeHandler}
				onMouseLeave={activeHandler}>
				<img
					src={urlFor(product?.image[0]).url()}
					alt={product?.name}
					width={300}
					height={300}
					className={classes.productImage}
				/>
				<Transition in={isActive} timeout={300} mountOnEnter unmountOnExit>
					{(state) => {
						const classesCss = [
							state === 'entered'
								? classes.showUp
								: state === 'exiting'
								? classes.hide
								: null,
						];
						return (
							<>
								<Link
									to={`/product/${product?.slug.current}`}
									onClick={handleClick}>
									<div className={`${classes.btnBox} ${classesCss}`}>
										<button> see detail</button>
									</div>
								</Link>
							</>
						);
					}}
				</Transition>

				<p className={classes.productName}>{product?.name}</p>
				<p className={classes.productPrice}>$ {product?.price}</p>
			</div>
		</div>
	);
};

export default Product;
