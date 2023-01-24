import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../utils/client';
import { productDetails, categoryProducts } from '../utils/data';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from 'react-icons/ai';

import Product from './Product';
import classes from './ProductDetail.module.css';
import Spinner from '../components/Spinner';

const ProductDetail = () => {
	const [productData, setProductData] = useState([]);
	const [categoryProductData, setCategoryProductData] = useState([]);
	const [newCategoryItems, setNewCategoryItems] = useState([]);

	const [index, setIndex] = useState(0);
	const { slug } = useParams();
	const category = productData.category;

	useEffect(() => {
		let query = productDetails(slug);
		let categoryQuery = categoryProducts(category);

		client.fetch(query).then((data) => setProductData(data[0]));
		client.fetch(categoryQuery).then((data) => setCategoryProductData(data));
	}, [slug, category]);

	useEffect(() => {
		setNewCategoryItems(
			categoryProductData.filter((item) => item._id !== productData._id)
		);
	}, [categoryProductData, productData._id]);

	if (!productData) return <Spinner message='Loading...' />;
	return (
		<div>
			<div className={classes.productDetailContainer}>
				<div>
					<div className={classes.imageContainer}>
						<img
							src={
								productData?.image && urlFor(productData?.image[index]).url()
							}
							alt={productData.name}
							className={classes.productDetailImage}
						/>
					</div>
					<div className={classes.smallImagesContainer}>
						{productData?.image &&
							productData?.image.map((item, i) => (
								<img
									alt={productData.name}
									key={i}
									src={urlFor(item)}
									className={
										i === index ? classes.selectedImage : classes.smallImage
									}
									onClick={() => setIndex(i)}
								/>
							))}
					</div>
				</div>

				<div className={classes.productDetailDesc}>
					<h1>{productData?.name}</h1>
					<div className={classes.reviews}>
						<div>
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiFillStar />
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p>{productData.details}</p>
					<p className={classes.price}>${productData.price}</p>
					<div className={classes.quantity}>
						<h3>Quantity:</h3>
						<p className={classes.quantityDesc}>
							<span className={classes.minus}>
								<AiOutlineMinus />
							</span>
							<span className={classes.num}>0</span>
							<span className={classes.plus}>
								<AiOutlinePlus />
							</span>
						</p>
						<h3>Size:</h3>
						<p className={classes.size}>
							<label for='size' > </label>
							<select name='size' id='size' className={classes.select}>
								<option value='S'>S</option>
								<option value='M'>M</option>
								<option value='L'>L</option>
							</select>
						</p>
					</div>
					<div className={classes.buttons}>
						<button type='button' className={classes.addToCart}>
							Add to Cart
						</button>
						<button type='button' className={classes.buyNow}>
							Buy Now
						</button>
					</div>
				</div>
			</div>

			<div className={classes.maylikeProductsWrapper}>
				<h2>You may also like</h2>
				<div className={classes.marquee}>
					<div className={classes.maylikeProductsContainer}>
						{newCategoryItems &&
							newCategoryItems.map((item) => (
								<Product key={item._id} product={item} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
