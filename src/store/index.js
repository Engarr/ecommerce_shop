import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart-slice';
import searchReducer from './search-slice';
import cartItemsReducer from './cartItems-slice';

const store = configureStore({
	reducer: {
		search: searchReducer,
		showCart: cartReducer,
		cartItems: cartItemsReducer,
	},
});

export default store;
