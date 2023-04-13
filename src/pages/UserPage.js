import React, { useEffect, useState } from 'react';
import { useParams, Link, redirect } from 'react-router-dom';
import classes from '../styles/UserPage.module.css';
import { RiImageAddLine } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { getAuthToken } from '../utils/auth';
import { toast } from 'react-hot-toast';
import Modal from '../components/Modal';
import UpdateData from '../components/UpdateProfil/UpdateData';

const UserPage = () => {
	const [userData, setUserData] = useState(null);
	const [productsData, setProductsData] = useState([]);
	const [isActive, setIsActive] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const params = useParams();
	const userId = params.userId;
	const token = getAuthToken();

	const fetchUserData = async () => {
		try {
			const response = await fetch(
				`http://localhost:8080/feed/user/${userId}?page=${currentPage}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const user = await response.json();

			setUserData(user.userData);
			const data = await user.products;
			if (response.ok) {
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
			} else {
				localStorage.removeItem('token');
				return redirect('/');
			}
		} catch (err) {
			console.log('Error loggingin:', err);
		}
	};
	// eslint-disable-next-line
	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line
	}, [userId, currentPage]);
	const optionHandler = () => {
		setIsActive((prev) => (prev = !prev));
	};

	const deleteProduct = async (id) => {
		const response = await fetch(`http://localhost:8080/feed/product/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
				'X-User-Id': userId,
			},
		});
		await response.json();
		if (!response.ok) {
			toast.error('Product cannot be removed. Something went wrong');
		} else {
			toast.success('Product has been successfully removed');
			window.location.reload();
		}
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		<div className={classes.mainContainer}>
			<Modal show={isActive} handler={optionHandler} />
			{isActive && <UpdateData optionHandler={optionHandler} />}

			<div className={classes.profilBox}>
				<div>
					<div className={classes.imageBox}>
						<RiImageAddLine className={classes.image} />
					</div>

					<h3>{userData.name}</h3>
				</div>

				<div className={classes.optionIcon} onClick={optionHandler}>
					<SlOptions />
				</div>
			</div>

			<div className={classes.productsMainContainer}>
				<div className={classes.border}></div>
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
				{productsData.length === 0 ? (
					<div>
						<p>No products</p>
					</div>
				) : (
					<div className={classes.productsContainer}>
						{productsData.map((product) => {
							return (
								<div key={product.id} className={classes.productBox}>
									<div className={classes.productData}>
										<div>
											<Link to={`/product/${product.id}`}>
												<img
													src={product.imageUrl}
													height={80}
													alt={product.name}
												/>
											</Link>
										</div>
										<div className={classes.nameBox}>
											<p>id: {product.id}</p>
											<p>{product.name}</p>
										</div>
									</div>

									<div className={classes.buttonBox}>
										<Link to={`/product/${product.id}/edit`}>
											<AiOutlineEdit />
										</Link>

										<button onClick={() => deleteProduct(product.id)}>
											<AiOutlineDelete />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
			<div className={classes.paginationBox}>
				<button onClick={() => handlePageChange(currentPage - 1)}>
					{currentPage}
				</button>
				<button onClick={() => handlePageChange(currentPage + 1)}>
					{currentPage + 1}
				</button>
			</div>
		</div>
	);
};

export default UserPage;
