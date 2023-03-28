import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../styles/NewProduct.module.css';
import Input from '../components/UI/Input';
import UploadFile from '../components/UI/UploadFile';
import { categories } from '../utils/data';
import { toast } from 'react-hot-toast';

const NewProduct = () => {
	const param = useParams();
	const userId = param.userId;
	const [productData, setProductData] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
	});

	const productDataHandler = (e) => {
		setProductData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:8080/feed/add-product', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: productData.name,
					category: productData.category,
					price: productData.price,
					description: productData.description,
					userId: userId,
				}),
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
			} else {
				console.log(data);
			}
		} catch (err) {
			console.log('Error adding product', err);
			toast.error('Adding a product failed');
		}
	};
	console.log(productData);
	return (
		<div>
			<div className={classes.mainContainer}>
				<h2>Please file the fields to add new product</h2>
				<div>
					<form className={classes.formContainer} onSubmit={onSubmit}>
						<div className={classes.formData}>
							<Input
								data='name'
								text='Product name:'
								tupe='text'
								onChange={productDataHandler}
							/>
							<div className={classes.select}>
								<select onChange={productDataHandler} name='category'>
									<option disabled>Chose category:</option>
									{categories.map((category) => (
										<option key={category.id} value={category.name}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							<div className={classes.photoContainer}>
								<UploadFile />
							</div>
							<Input
								data='price'
								text=' Product price:'
								type='number'
								min='1'
								onChange={productDataHandler}
							/>
							<div className={classes.textareaBox}>
								<textarea
									className={classes.textarea}
									id='description'
									name='description'
									placeholder='Description:'
									onChange={productDataHandler}
								/>
								<label className={classes.label} htmlFor='description'>
									Description
								</label>
							</div>
						</div>
						<div>
							<button className={classes.saveBtn}>Save product</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default NewProduct;
