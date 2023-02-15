import { createSlice } from '@reduxjs/toolkit';
const cartItemsSlice = createSlice({
	name: 'cartItems',
	initialState: {
		items: [],
		totalQuantity: 0,
	},
	reducers: {
		onAddItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.totalQuantity = state.totalQuantity + newItem.quantity;
			if (!existingItem) {
				state.items.push(action.payload);
			} else {
				existingItem.quantity = existingItem.quantity + action.payload.quantity;
				existingItem.price =
					existingItem.price + action.payload.price * action.payload.quantity;
			}
		},
		onRemoveItem() {},
	},
});

export const cartItemActions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
