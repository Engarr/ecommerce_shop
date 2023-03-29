import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import classes from '../styles/UserPage.module.css';
import { RiImageAddLine } from 'react-icons/ri';
import { SlOptions } from 'react-icons/sl';
//
import axios from 'axios';

const UserPage = () => {
	const [userData, setUserData] = useState(null);
	const params = useParams();
	const userId = params.userId;
	const [image, setImage] = useState(null);

	const fetchUserData = async () => {
		try {
			const response = await fetch(`http://localhost:8080/feed/user/` + userId);
			const data = await response.json();

			setUserData(data.userData);
		} catch (err) {
			console.log('Error loggingin:', err);
		}
	};

	useEffect(() => {
		fetchUserData();
		// eslint-disable-next-line
	}, [userId]);

	if (!userData) {
		return <div>Loading...</div>;
	}
	//
	//
	const imageHandler = (e) => {
		setImage(e.target.files[0]);
	};
	//
	const sumbit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image);
		axios
			.post('http://localhost:8080/feed/add-product', formData)
			.then((res) => console.log(res));
	};
	return (
		<div className={classes.mainContainer}>
			{/* // */}
			<div>
				<input type='file' onChange={imageHandler} />
				<button onClick={sumbit}>send</button>
			</div>
			{/* // */}
			<div className={classes.profilBox}>
				<div>
					<div className={classes.imageBox}>
						<RiImageAddLine className={classes.image} />
					</div>

					<h3>{userData.name}</h3>
				</div>

				<div>
					<SlOptions className={classes.optionIcon} />
				</div>
			</div>
			<div className={classes.addBtnBox}>
				<Link to={`/add-product/${userId}`}>
					<button className={classes.addBtn}>
						<p>Add new product</p>
					</button>
				</Link>
			</div>
			<div>
				<div>
					<p>Your products</p>
				</div>
				<div>
					<div>zdjęcie</div>
					<div>nazwa</div>
					<div>przyciski eydtuj/usuń</div>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
