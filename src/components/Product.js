import React, { useState } from 'react';
import classes from './Product.module.css';
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
		<div className={classes.mainContainer}>
			<div
				className={classes.productCard}
				onMouseEnter={activeHandler}
				onMouseLeave={activeHandler}>
				<Link to={`/product/${product._id}`} onClick={handleClick}>
					<img
						src={product.imageUrl}
						alt={product.name}
						width={250}
						height={250}
						className={classes.productImage}
					/>
				</Link>
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
								<Link to={`product/${product._id}`} onClick={handleClick}>
									<div className={`${classes.btnBox} ${classesCss}`}>
										<div className={classes.textShadow}>
											<p className={classes.productName}>{product?.name}</p>
											<p className={classes.productPrice}>$ {product?.price}</p>
										</div>
										<button> see detail</button>
									</div>
								</Link>
							</>
						);
					}}
				</Transition>
			</div>
		</div>
	);
};

export default Product;
