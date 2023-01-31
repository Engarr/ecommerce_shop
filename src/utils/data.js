export const categories = [
	{ name: 'One pieces' },
	{ name: 'Two pieces' },
	{ name: 'SWIMMING TRUNKS' },
	{ name: 'TUNICS' },
];

export const feedBanner = `*[_type == "banner"]`;

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
