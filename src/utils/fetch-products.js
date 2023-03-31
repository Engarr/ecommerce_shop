export const fetchProducts = async (category) => {
	let url = 'http://localhost:8080/feed/products';
	if (category) {
		url = `http://localhost:8080/feed/products/${category}`;
	}
	const response = await fetch(url);
	const data = await response.json();
	const products = data.products.map((product) => {
		return {
			_id: product._id,
			name: product.name,
			price: product.price,
			categroy: product.category,
			imageUrl: `http://localhost:8080/${product.imageUrl[0]}`,
			userId: product.creator,
		};
	});

	return products;
};
