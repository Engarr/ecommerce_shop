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
import { useStateContext } from '../context/StateContext';

const ProductDetail = () => {
	const [productData, setProductData] = useState([]);
	const [categoryProductData, setCategoryProductData] = useState([]);
	const [newCategoryItems, setNewCategoryItems] = useState([]);
	const [randomItems, setRandomItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [size, setSize] = useState('S');

	const { decreaseQty, increaseQty, qty, onAdd, cartItems } = useStateContext();

	const { slug } = useParams();
	const category = productData.category;

	const updateRandomItems = () => {
		const shuffledItems = newCategoryItems.sort(() => Math.random() - 0.5);
		setRandomItems(shuffledItems.slice(0, 10));
	};
	useEffect(() => {
		updateRandomItems();
		// eslint-disable-next-line
	}, [newCategoryItems]);

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

	const sizeHandler = (e) => {
		setSize(e.target.value);
	};
	// useEffect(() => {
	// 	sizeHandler();
	// }, [size]);

	console.log(cartItems);
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
									onMouseEnter={() => setIndex(i)}
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
							<span className={classes.minus} onClick={decreaseQty}>
								<AiOutlineMinus />
							</span>
							<span className={classes.num}>{qty}</span>
							<span className={classes.plus} onClick={increaseQty}>
								<AiOutlinePlus />
							</span>
						</p>
						<h3>Size:</h3>
						<p className={classes.size}>
							<label for='size'> </label>
							<select
								name='size'
								id='size'
								className={classes.select}
								onChange={sizeHandler}>
								<option value='S'>S</option>
								<option value='M'>M</option>
								<option value='L'>L</option>
							</select>
						</p>
					</div>
					<div className={classes.buttons}>
						<button
							type='button'
							className={classes.addToCart}
							onClick={() => onAdd(productData, qty, size)}>
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
				<div className={`${classes.marquee} ${classes.track}`}>
					<div className={classes.maylikeProductsContainer}>
						{randomItems &&
							randomItems.map((item) => (
								<Product key={item._id} product={item} />
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
