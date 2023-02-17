import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSearchVisible: false,
	cartIsVisible: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialState,
	reducers: {
		searchHandler(state) {
			state.isSearchVisible = !state.isSearchVisible;
		},
		cartHandler(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
