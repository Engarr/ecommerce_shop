import React from 'react';
import ProductForm from '../components/ProductForm/ProductForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditProduct = () => {
	const { product } = useRouteLoaderData('product-detail');

	return (
		<div>
			<ProductForm method='PUT' prodData={product} />
		</div>
	);
};

export default EditProduct;
