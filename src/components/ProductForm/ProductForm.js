import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classes from './ProductForm.module.css';
import Input from '../../components/UI/Input';
import UploadFile from '../../components/UI/UploadFile';
import { categories } from '../../utils/data';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ method, prodData }) => {
	if (!method) {
		method = 'POST';
	}
	const param = useParams();
	const navigate = useNavigate();
	const userId = prodData?.creator || param.userId;
	const prductId = param.productId;
	const [imageSrcs, setImageSrcs] = useState(prodData?.imageUrl || []);

	const [images, setImages] = useState(prodData?.imageUrl || []);
	const [productData, setProductData] = useState({
		name: prodData?.name || '',
		category: prodData?.category || '',
		price: +prodData?.price || 0,
		description: prodData?.description || '',
	});

	const [errorsBackend, setErrorsBackend] = useState({
		name: '',
		category: '',
		price: '',
		description: '',
	});
	useEffect(() => {}, [productData]);

	const fetchImages = () => {
		if (prodData.imageUrl) {
			const prefix = 'http://localhost:8080/';
			const newArr = prodData.imageUrl.map((image) => prefix + image);
			setImageSrcs(newArr);
		}
	};
	useEffect(() => {
		if (prodData) {
			fetchImages();
		}
		// eslint-disable-next-line
	}, [prodData?.imageUrl]);
	const imageHandler = (e) => {
		setImages((prevImages) => ({
			...prevImages,
			[e.target.name]: e.target.files[0],
		}));
	};

	const productDataHandler = (e) => {
		setProductData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
		setErrorsBackend((prevErrors) => ({
			...prevErrors,
			[e.target.name]: '',
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
		let url;
		try {
			const formData = new FormData();
			formData.append('name', productData.name);
			formData.append('category', productData.category);
			formData.append('price', productData.price);
			formData.append('description', productData.description);
			formData.append('userId', userId);

			for (let i = 0; i < Object.keys(images).length; i++) {
				formData.append('images', images[i]);
			}
			if (method === 'PUT') {
				url = `http://localhost:8080/feed/product/${prductId}`;
			} else {
				url = 'http://localhost:8080/feed/add-product';
			}

			const response = await fetch(url, {
				method: method,
				body: formData,
			});
			const data = await response.json();

			if (response.ok) {
				navigate(`/profil/${userId}`);
				toast.success('Product has been created.');
			} else {
				toast.error('Product cannot be created.Something went wrong');
				console.log(data); //<-------------
				const errorObj = {};
				data.errors.forEach((error) => (errorObj[error.param] = error.msg));
				setErrorsBackend(errorObj);
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
								defaultValue={prodData ? prodData.name : ''}
								type='text'
								onChange={productDataHandler}
								error={errorsBackend.name}
								placeholder='Product name:'
							/>
							<div className={classes.error}>
								{errorsBackend.name && <p>{errorsBackend.name}</p>}
							</div>
							<div
								className={`${classes.select} ${
									errorsBackend.category ? classes.errorBorderInput : ''
								}`}>
								<select
									onChange={productDataHandler}
									name='category'
									defaultValue={
										prodData ? prodData.category : 'Chose category'
									}>
									<option
										value={prodData ? prodData.category : 'Chose category'}
										disabled>
										{prodData ? prodData.category : 'Chose category'}
									</option>
									{categories.map((category) => (
										<option key={category.id} value={category.name}>
											{category.name}
										</option>
									))}
								</select>
							</div>
							<div className={classes.error}>
								{errorsBackend.category && <p>{errorsBackend.category}</p>}
							</div>

							<div className={classes.photoContainer}>
								<UploadFile onChange={handleFileSelect} imageSrcs={imageSrcs} />
							</div>
							<Input
								data='price'
								text=' Product price:'
								defaultValue={prodData ? prodData.price : ''}
								type='number'
								step={0.01}
								onChange={productDataHandler}
								error={errorsBackend.price}
								placeholder='Product price:'
							/>
							<div className={classes.error}>
								{errorsBackend.price && <p>{errorsBackend.price}</p>}
							</div>
							<div
								className={`${classes.textareaBox} ${
									errorsBackend.description ? classes.errorBorder : ''
								}`}>
								<textarea
									className={classes.textarea}
									id='description'
									name='description'
									defaultValue={prodData ? prodData.description : ''}
									placeholder='Description:'
									onChange={productDataHandler}
									// value={errorsBackend.description ? 'text' : ''}
								/>
								<label className={classes.label} htmlFor='description'>
									Description:
								</label>
							</div>
							<div className={classes.error}>
								{errorsBackend.description && (
									<p>{errorsBackend.description}</p>
								)}
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

export default ProductForm;
