import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classes from '../styles/UserPage.module.css';
import { RiImageAddLine } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const UserPage = () => {
	const [userData, setUserData] = useState(null);
	const [productsData, setProductsData] = useState([]);
	const params = useParams();
	const userId = params.userId;

	const fetchUserData = async () => {
		try {
			const response = await fetch(`http://localhost:8080/feed/user/` + userId);
			const user = await response.json();

			setUserData(user.userData);
			const data = await user.products;
			const products = data.map((product) => {
				return {
					id: product._id,
					name: product.name,
					price: product.price,
					imageUrl: `http://localhost:8080/${product.imageUrl[0]}`,
					description: product.description,
					userId: product.creator,
				};
			});
			setProductsData(products);
		} catch (err) {
			console.log('Error loggingin:', err);
		}
	};
	// eslint-disable-next-line
	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line
	}, [userId]);

	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		<div className={classes.mainContainer}>
			<div className={classes.profilBox}>
				<div>
					<div className={classes.imageBox}>
						<RiImageAddLine className={classes.image} />
					</div>

					<h3>{userData.name}</h3>
				</div>

				<div className={classes.optionIcon}>
					<SlOptions />
				</div>
			</div>

			<div>
				<div className={classes.title}>
					<p>Your products:</p>
				</div>
				<div className={classes.addBtnBox}>
					<Link to={`/add-product/${userId}`}>
						<button className={classes.addBtn}>
							<p>Add new product</p>
						</button>
					</Link>
				</div>
				<div className={classes.border}></div>
				{productsData.length === 0 ? (
					<div>
						<p>No products</p>
					</div>
				) : (
					<div className={classes.productsContainer}>
						{productsData.map((product) => {
							return (
								<div key={product._id} className={classes.productBox}>
									<div className={classes.productData}>
										<div>
											<img
												src={product.imageUrl}
												height={80}
												alt={product.name}
											/>
										</div>
										<div className={classes.nameBox}>
											<p>id: {product.id}</p>
											<p>{product.name}</p>
										</div>
									</div>

									<div className={classes.buttonBox}>
										<Link>
											<AiOutlineEdit />
										</Link>

										<button>
											<AiOutlineDelete />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default UserPage;
