import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search-slice';
import cartReducer from './cart-slice';


const store = configureStore({
	reducer: {
		search: searchReducer,
		cart: cartReducer,
	},
});

export default store;
