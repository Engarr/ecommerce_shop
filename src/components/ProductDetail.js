import React, { useCallback, useEffect, useState } from 'react';
import { Link, json, useLoaderData } from 'react-router-dom';
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
import { GrNext, GrPrevious } from 'react-icons/gr';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Transition from 'react-transition-group/Transition';
import { cartItemActions } from '../store/cartItems-slice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import store from '../store/index';

const ProductDetail = () => {
	const [productData, setProductData] = useState([]);
	const [size, setSize] = useState('S');
	const [categoryProductData, setCategoryProductData] = useState([]);
	const [newCategoryItems, setNewCategoryItems] = useState([]);
	const [randomItems, setRandomItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isActive, setIsActive] = useState(false);
	const category = productData.category;
	let imageLength;
	const dispatch = useDispatch();
	const data = useLoaderData();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setProductData(data[0]);
	}, [data]);

	useEffect(() => {
		let categoryQuery = categoryProducts(category);
		const loader = async () => {
			const data = await client.fetch(categoryQuery);
			setCategoryProductData((prevData) => [...prevData, ...data]);
			setLoading(false);
		};
		loader();
	}, [category]);

	useEffect(() => {
		updateRandomItems();
		// eslint-disable-next-line
	}, [newCategoryItems]);

	const updateRandomItems = () => {
		let shuffledItems = newCategoryItems.sort(() => Math.random() - 0.5);
		let maxProducts = shuffledItems.slice(0, 5);

		setRandomItems(maxProducts);
	};

	useEffect(() => {
		setNewCategoryItems(
			categoryProductData.filter((item) => item._id !== productData._id)
		);
	}, [categoryProductData, productData._id]);

	const sizeHandler = (e) => {
		setSize(e.target.value);
	};

	const additemHandler = () => {
		dispatch(
			cartItemActions.onAddItem({
				_id: productData._id.concat(size),
				price: productData.price,
				image: productData.image[0],
				size: size,
				quantity: quantity,
				name: productData.name,
			})
		);
		localStorage.setItem(
			'cartItems',
			JSON.stringify(store.getState().cartItems)
		);
		toast.success(`${quantity} ${productData.name} added to the cart.`);
	};
	const incQuantity = () => {
		setQuantity((prevQty) => prevQty + 1);
	};

	const decQuantity = () => {
		setQuantity((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};
	const indexIncrease = () => {
		if (productData) {
			imageLength = productData.image.length - 1;
			if (index < imageLength) {
				setIndex((prevIndex) => prevIndex + 1);
			} else {
				setIndex(0);
			}
		}
	};
	const indexDecrease = () => {
		if (productData) {
			imageLength = productData.image.length - 1;
			if (index > 0) {
				setIndex((prevIndex) => prevIndex - 1);
			} else {
				setIndex(imageLength);
			}
		}
	};

	const activeDetailHandler = useCallback(() => {
		setIsActive((prev) => (prev = !prev));
	}, [setIsActive]);

	if (!productData) return <Spinner message='Loading...' />;

	return (
		<div className={classes.mainContainer}>
			<div className={classes.productDetailContainer}>
				<div className={classes.imageContainer}>
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
					<div className={classes.imageContainer}>
						<div className={classes.buttonBox}>
							<button className={classes.prevBtn} onClick={indexDecrease}>
								<GrPrevious />
							</button>
							<button className={classes.nextBtn} onClick={indexIncrease}>
								<GrNext />
							</button>
						</div>

						<img
							src={
								productData?.image && urlFor(productData?.image[index]).url()
							}
							alt={productData.name}
							className={classes.productMainImage}
						/>
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

					<p className={classes.price}>${productData.price}</p>
					<div className={classes.quantity}>
						<div>
							<h3>Quantity:</h3>
							<p className={classes.quantityDesc}>
								<span className={classes.minus} onClick={decQuantity}>
									<AiOutlineMinus />
								</span>
								<span className={classes.num}>{quantity}</span>
								<span className={classes.plus} onClick={incQuantity}>
									<AiOutlinePlus />
								</span>
							</p>
						</div>
						<div>
							<h3>Size:</h3>
							<p className={classes.size}>
								<label htmlFor='size'> </label>
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
					</div>
					<div className={classes.buttons}>
						<button
							type='button'
							className={classes.addToCart}
							onClick={additemHandler}>
							Add to Cart
						</button>
						<Link to='/information'>
							<button
								type='button'
								className={classes.buyNow}
								onClick={additemHandler}>
								Buy Now
							</button>
						</Link>
					</div>

					<Transition in={isActive} timeout={300}>
						{(state) => {
							const classesCssArrow = [
								state === 'entered'
									? classes.rotateUp
									: state === 'exiting'
									? classes.rotateDown
									: null,
							];

							return (
								<div
									className={classes.detailBox}
									onClick={activeDetailHandler}>
									<h4>Details: </h4>
									<MdKeyboardArrowDown
										className={`${classes.arrow} ${classesCssArrow}`}
									/>
								</div>
							);
						}}
					</Transition>
					<Transition in={isActive} timeout={500}>
						{(state) => {
							const classesCssBox = [
								state === 'entered'
									? classes.showBox
									: state === 'exiting'
									? classes.hideBox
									: null,
							];

							return (
								<div className={`${classes.descBox} ${classesCssBox}`}>
									<p className={classes.description}>{productData.details}</p>
								</div>
							);
						}}
					</Transition>
				</div>
			</div>

			<div className={classes.maylikeProductsWrapper}>
				<h2>You may also like</h2>
				{loading ? (
					<Spinner message='Loading...' />
				) : (
					<div className={classes.maylikeProductsContainer}>
						{randomItems &&
							randomItems.map((item) => (
								<Product key={item._id} product={item} />
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductDetail;

export async function loader({ request, params }) {
	const slug = params.slug;
	let query = productDetails(slug);
	const response = await client.fetch(query);
	console.log(response);
	if (response.length < 0) {
		throw json(
			{ message: 'Could not fetch details for selected product' },
			{
				status: 500,
			}
		);
	} else {
		return response;
	}
}
