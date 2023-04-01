import React, { useCallback, useEffect, useState } from 'react';
import {
	Link,
	json,
	useRouteLoaderData,
	useParams,
	defer,
} from 'react-router-dom';
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
import { fetchProducts } from '../utils/fetch-products';

const ProductDetail = () => {
	const param = useParams();
	const productId = param.productId;
	const [productData, setProductData] = useState({
		_id: '',
		name: '',
		price: '',
		imageUrl: [],
		description: '',
		category: '',
	});

	const [size, setSize] = useState('S');
	const [randomItems, setRandomItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [isActive, setIsActive] = useState(false);
	let imageLength;
	const dispatch = useDispatch();
	const { product } = useRouteLoaderData('product-detail');
	const [loading, setLoading] = useState(true);
	const category = productData.category;

	const fetchProductData = async () => {
		const prefix = 'http://localhost:8080/';
		const imagesLinks = await product.imageUrl.map((image) => prefix + image);

		setProductData({
			_id: product._id,
			name: product.name,
			price: product.price,
			description: product.description,
			imageUrl: imagesLinks,
			category: product.category,
		});
	};

	const fetchProductsData = async (categoryParam) => {
		const productsData = await fetchProducts(categoryParam);

		const newArr = await productsData.filter(
			(item) => item._id !== productData._id
		);

		let shuffledItems = await newArr.sort(() => Math.random() - 0.5);
		let maxProducts = await shuffledItems.slice(0, 3);

		setRandomItems(maxProducts);
		setLoading(false);
	};
	if (category && randomItems.length === 0) {
		fetchProductsData(category);
	}

	useEffect(() => {
		fetchProductData();
		// eslint-disable-next-line
	}, [productId]);
	useEffect(() => {
		fetchProductsData(category);
		// eslint-disable-next-line
	}, [productData]);

	const sizeHandler = (e) => {
		setSize(e.target.value);
	};

	const additemHandler = () => {
		dispatch(
			cartItemActions.onAddItem({
				_id: productData._id.concat(size),
				price: productData.price,
				image: productData.imageUrl[0],
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
			imageLength = productData.imageUrl.length - 1;
			if (index < imageLength) {
				setIndex((prevIndex) => prevIndex + 1);
			} else {
				setIndex(0);
			}
		}
	};
	const indexDecrease = () => {
		if (productData) {
			imageLength = productData.imageUrl.length - 1;
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
						{productData.imageUrl.map((item, i) => (
							<img
								alt={productData.name}
								key={i}
								src={item}
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
							src={productData.imageUrl[index]}
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
									<p className={classes.description}>
										{productData.description}
									</p>
								</div>
							);
						}}
					</Transition>
				</div>
			</div>

			<div className={classes.maylikeProductsWrapper}>
				{randomItems.length > 0 && <h2>You may also like</h2>}
				{loading ? (
					<Spinner message='Loading...' />
				) : (
					<>
						<div className={classes.maylikeProductsContainer}>
							{randomItems.map((item) => (
								<Product key={item._id} product={item} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProductDetail;

export async function loader({ request, params }) {
	const productId = params.productId;

	const response = await fetch(`http://localhost:8080/feed/${productId}`);

	const data = await response.json();
	const product = await data.product;
	if (!response.ok) {
		throw json(
			{ message: 'Could not fetch details for selected product' },
			{
				status: 500,
			}
		);
	} else {
		return defer({
			product: product,
		});
	}
}
