import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

const fetchCarftFromStorage = JSON.parse(localStorage.getItem('cart') || '[]');
let sum = 0;
let sumTotalPrice = 0;

const totalQuantitiesFromSotarge = fetchCarftFromStorage.map(
	(item) => item.quantity
);
for (let i = 0; i < totalQuantitiesFromSotarge.length; i++) {
	sum = sum + totalQuantitiesFromSotarge[i];
}

const totalPricesFromStorage = fetchCarftFromStorage.map(
	(item) => item.price * item.quantity
);

for (let i = 0; i < totalPricesFromStorage.length; i++) {
	sumTotalPrice = sumTotalPrice + totalPricesFromStorage[i];
}

const fetchUserDataFromLocalStorage = JSON.parse(
	localStorage.getItem('userInfo') || '[]'
);

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState(fetchCarftFromStorage);
	const [totalPrice, setTotalPrice] = useState(
		Number((sumTotalPrice || 0).toFixed(2))
	);
	const [totalQuantities, setTotalQuantities] = useState(sum || 0);
	const [qty, setQty] = useState(1);
	const [userData, setUserData] = useState(fetchUserDataFromLocalStorage);
	const [isLogin, setIsLogin] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [street, setStreet] = useState('');
	const [additional, setAdditional] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [city, setCity] = useState('');
	const [tel, setTel] = useState('');

	let foundProduct;
	let index;
	const cartHandler = () => {
		setShowCart((prev) => (prev = !prev));
	};

	const emailHandler = (e) => {
		setEmail(e.target.value);
	};
	const nameHandler = (e) => {
		setName(e.target.value);
	};
	const surnameHandler = (e) => {
		setSurname(e.target.value);
	};
	const streetHandler = (e) => {
		setStreet(e.target.value);
	};
	const zipCodeHandler = (e) => {
		setZipCode(e.target.value);
	};
	const cityHandler = (e) => {
		setCity(e.target.value);
	};
	const telHandler = (e) => {
		setTel(e.target.value);
	};
	const additionalHandler = (e) => {
		setAdditional(e.target.value);
	};

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cartItems));
	}, [cartItems]);

	useEffect(() => {
		localStorage.setItem('userInfo', JSON.stringify(userData));
		if (userData.length === 0) {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, [userData]);

	const onAdd = (product, quantity, size) => {
		const isProductInCart = cartItems.find(
			(item) => item._id === product._id && item.size === size
		);
		setTotalPrice(
			(prevTotalPrice) => prevTotalPrice + product.price * quantity
		);
		setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
		if (isProductInCart) {
			// eslint-disable-next-line
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

			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	const toogleItemQuantity = (id, value, size) => {
		foundProduct = cartItems.find(
			(item) => item._id === id && item.size === size
		);
		index = cartItems.findIndex(
			(item) => item._id === id && item.size === size
		);

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
				setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
				setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
			}
		}
	};

	const onDelete = (id, size) => {
		foundProduct = cartItems.find(
			(item) => item._id === id && item.size === size
		);
		let newCartItems = [...cartItems];
		const deleteItem = newCartItems.findIndex(
			(item) => item._id === foundProduct._id && item.size === foundProduct.size
		);
		newCartItems.splice(deleteItem, 1);
		setCartItems(newCartItems);
		setTotalPrice(
			(prevTotalPrice) =>
				prevTotalPrice - foundProduct.price * foundProduct.quantity
		);
		setTotalQuantities(
			(prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
		);
	};

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
				onDelete,
				userData,
				setUserData,
				setIsLogin,
				isLogin,
				email,
				emailHandler,
				nameHandler,
				surnameHandler,
				streetHandler,
				zipCodeHandler,
				cityHandler,
				telHandler,
				additionalHandler,
				name,
				surname,
				city,
				tel,
				zipCode,
				street,
				additional,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
