import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui-slice';
import cartItemsReducer from './cartItems-slice';
import formReducer from './form-slice';

const store = configureStore({
	reducer: {
		ui: uiReducer,
		cartItems: cartItemsReducer,
		form: formReducer,
	},
});

export default store;
