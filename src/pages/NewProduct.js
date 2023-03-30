import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from '../styles/NewProduct.module.css';
import Input from '../components/UI/Input';
import UploadFile from '../components/UI/UploadFile';
import { categories } from '../utils/data';
import { toast } from 'react-hot-toast';
import { redirect } from 'react-router-dom';

const NewProduct = () => {
	const param = useParams();
	const userId = param.userId;
	const [imageSrcs, setImageSrcs] = useState('');
	const [image, setImage] = useState(null);
	const [productData, setProductData] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
	});
	////

	const imageHandler = (e) => {
		setImage(e.target.files[0]);
	};

	///
	const productDataHandler = (e) => {
		setProductData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleFileSelect = (event) => {
		imageHandler(event);
		const file = event.target.files[0];
		const reader = new FileReader();

		let name = event.target.name;
		reader.onload = (event) => {
			const newImageSrcs = [...imageSrcs];
			newImageSrcs[name] = event.target.result;
			setImageSrcs(newImageSrcs);
		};

		reader.readAsDataURL(file);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append('name', productData.name);
			formData.append('category', productData.category);
			formData.append('price', productData.price);
			formData.append('description', productData.description);
			formData.append('userId', userId);
			formData.append('image', image);

			const response = await fetch('http://localhost:8080/feed/add-product', {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			if (response.ok) {
				console.log(data);
				redirect(`/profil/${userId}`);
				toast.success('Product has been created.');
			} else {
				console.log(data);
				toast.error('Product cannot be created.Something went wrong');
			}
		} catch (err) {
			console.log('Error adding product', err);
			toast.error('Adding a product failed');
		}
	};
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
								<select
									onChange={productDataHandler}
									name='category'
									defaultValue='chose category'>
									<option value='chose category' disabled>
										Chose category
									</option>
									{categories.map((category) => (
										<option key={category.id} value={category.name}>
											{category.name}
										</option>
									))}
								</select>
							</div>

							<div className={classes.photoContainer}>
								<UploadFile onChange={handleFileSelect} imageSrcs={imageSrcs} />
							</div>
							<Input
								data='price'
								text=' Product price:'
								type='number'
								step={0.01}
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
