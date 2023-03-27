import React from 'react';
import { useParams } from 'react-router-dom';

const NewProduct = () => {
	const param = useParams();
	const userId = param.userId;
	console.log(userId);


	return <div></div>;
};

export default NewProduct;
