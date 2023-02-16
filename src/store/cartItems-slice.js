import { createSlice } from '@reduxjs/toolkit';

const localStorageItems = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: {
			items: [],
			totalQuantity: 0,
	  };

const initialState = {
	items: localStorageItems.items,
	totalQuantity: localStorageItems.totalQuantity
};

const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState: initialState,
	reducers: {
		onAddItem: (state, action) => {
			const newItem = action.payload;
			const existingItem = state.items.find(
				(item) => item.id === newItem.id && item.size === newItem.size
			);
			if (!existingItem) {
				state.items.push(newItem);
			} else {
				existingItem.quantity = existingItem.quantity + newItem.quantity;
				existingItem.price =
					existingItem.price + newItem.price * newItem.quantity;
			}
			state.totalQuantity = state.totalQuantity + newItem.quantity;
		},
		increaseQuantity: (state, action) => {
			const itemId = action.payload;
			const existingItem = state.items.find((item) => item._id === itemId);
			if (existingItem) {
				existingItem.quantity++;
				state.totalQuantity++;
			}
		},

		decreaseQuantity: (state, action) => {
			const itemId = action.payload;
			const existingItem = state.items.find((item) => item._id === itemId);
			if (existingItem && existingItem.quantity > 1) {
				existingItem.quantity--;
				state.totalQuantity--;
			}
		},
		removeItem: (state, action) => {
			const itemId = action.payload;
			const existingItem = state.items.find((item) => item._id === itemId);
			if (existingItem) {
				state.items = state.items.filter((item) => item !== existingItem);
				state.totalQuantity = state.totalQuantity - existingItem.quantity;
			}
		},
	},
});

export const cartItemActions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
