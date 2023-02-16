import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
	name: 'showcart',
	initialState: { cartIsVisible: false },
	reducers: {
		cartHandler(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
	},
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
