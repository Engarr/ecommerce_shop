import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: 'search',
	initialState: { isSearchVisible: false },
	reducers: {
		searchHandler(state) {
			state.isSearchVisible = !state.isSearchVisible;
		},
	},
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
