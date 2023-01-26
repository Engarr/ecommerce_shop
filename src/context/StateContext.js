import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantities, setTotalQuantities] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const cartHandler = () => {
		setShowCart((prev) => (prev = !prev));
	};

	const onAdd = (product, quantity, size) => {
		const isProductInCart = cartItems.find(
			(item) => item._id === product._id && item.size === size
		);
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
		if (isProductInCart) {
			const updatedCartItems = cartItems.map((cartProduct) => {
				if (cartProduct._id === product._id)
					return {
						...cartProduct,
						quantity: cartProduct.quantity + quantity,
					};
			});

			setCartItems(updatedCartItems);
		} else {
			product.quantity = quantity;
			product.size = size;
			product._id = uuidv4();
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const toogleItemQuantity = (id, value) => {
		foundProduct = cartItems.find((item) => item._id === id);
		index = cartItems.findIndex((item) => item._id === id);

		if (value === 'increase') {
			let newCartItems = [...cartItems];

			newCartItems[index] = {
				...foundProduct,
				quantity: foundProduct.quantity + 1,
			};
			setCartItems(newCartItems);
			setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
		} else if (value === 'decrease') {
			if (foundProduct.quantity > 1) {
				let newCartItems = [...cartItems];
				newCartItems[index] = {
					...foundProduct,
					quantity: foundProduct.quantity - 1,
				};
				setCartItems(newCartItems);
				setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
		}
	};

	// const toogleItemQuantity = (id, value) => {
	// 	foundProduct = cartItems.find((item) => item._id === id);
	// 	index = cartItems.findIndex((product) => product._id === id);

	// 	if (value === 'increase') {
	// 		let newCartItems = [...cartItems];
	// 		newCartItems[index] = {
	// 			...foundProduct,
	// 			quantity: foundProduct.quantity + 1,
	// 		};
	// 		setCartItems(newCartItems);
	// 		setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
	// 		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
	// 	} else if (value === 'decrease') {
	// 		if (foundProduct.quantity > 1) {
	// 			let newCartItems = [...cartItems];
	// 			newCartItems[index] = {
	// 				...foundProduct,
	// 				quantity: foundProduct.quantity - 1,
	// 			};
	// 			setCartItems(newCartItems);
	// 			setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
	// 			setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
	// 		}
	// 	}
	// };

	const increaseQty = () => {
		setQty((prevQty) => prevQty + 1);
	};
	const decreaseQty = () => {
		setQty((prevQty) => {
			if (prevQty - 1 < 1) return 1;
			return prevQty - 1;
		});
	};

	return (
		<Context.Provider
			value={{
				showCart,
				cartItems,
				totalPrice,
				totalQuantities,
				qty,
				increaseQty,
				decreaseQty,
				onAdd,
				cartHandler,
				toogleItemQuantity,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
