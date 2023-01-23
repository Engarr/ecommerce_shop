import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../utils/client';
import { productDetails } from '../utils/data';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import classes from './ProductDetail.module.css';

const ProductDetail = () => {
	const [productData, setProductData] = useState([]);

	const { slug } = useParams();

	useEffect(() => {
		let query = productDetails(slug);
		if (query) {
			client.fetch(query).then((data) => setProductData(data[0]));
		}
	}, [slug]);

	return (
		
			<div className={classes.productContainer}>
				<div className={classes.imageBox}>
					<img
						src={productData?.image && urlFor(productData?.image[0]).url()}
						alt={productData.name}
						className={classes.productDetailImage}
						// width={250}
					/>
				</div>
				<div className={classes.productDetailContainter}>
					<div className={classes.detailBox}>
						<h1>{productData.name}</h1>
						<h3>Details:</h3>
						<p>{productData.details}</p>
						<p className={classes.price}>
							<span>Price:</span> ${productData.price}
						</p>
					</div>

					<div className={classes.quantity}>
						<h3>Quantity:</h3>

						<div className={classes.quantityBox}>
							<span className={classes.plus}>
								<AiOutlineMinus />
							</span>
							<span className={classes.count}>0</span>
							<span className={classes.minus}>
								<AiOutlinePlus />
							</span>
						</div>
						<label for='cars'>
							<h3>Size:</h3>
						</label>
						<div>
							<select name='cars' id='cars' className={classes.select}>
								<option value='S'>S</option>
								<option value='M'>M</option>
								<option value='L'>L</option>
							</select>
						</div>
					</div>
				</div>
			</div>
		
	);
};

export default ProductDetail;
