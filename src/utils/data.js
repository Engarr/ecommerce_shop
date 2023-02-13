export const categories = [
	{ name: 'One pieces' },
	{ name: 'Two pieces' },
	{ name: 'SWIMMING TRUNKS' },
	{ name: 'TUNICS' },
	{ name: 'Top of the outfit' },
	{ name: 'Bottom of the outfit' },
	{ name: 'FAQ' },
];

export const shippingCost = [
	{
		name: 'Courier DPD',
		price: 5.49,
		option: '0',
	},
	{
		name: 'Courier DHL',
		price: 6.99,
		option: '1',
	},
];
export const paymentMethod = [
	{
		name: 'Traditional transfer',
		description:
			'After clicking "Order" you will be redirected to the PayU website to make a secure online transfer from your bank.',
		option: '0',
	},
	{
		name: 'PayPal',
		description:
			'After clicking "Order", you will be redirected to PayPal to make a secure payment.',
		option: '1',
	},
];

export const feedBanner = `*[_type == "banner"]`;
export const feedProducts = `*[_type == "product"]`;

export const productDetails = (slug) => {
	const query = `*[_type == "product" && slug.current == '${slug}']`;
	return query;
};
export const categoryProducts = (category) => {
	const query = `*[_type == "product" && category == '${category}']`;
	return query;
};
export const loginUser = (email) => {
	const query = `*[_type == "user" && email == '${email}']
		
	
		
	`;
	return query;
};
