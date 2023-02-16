import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	surname: '',
	street: '',
	additional: '',
	zipCode: '',
	city: '',
	tel: '',
};

const formSlice = createSlice({
	name: 'form',
	initialState,
	reducers: {
		updatedField: (state, action) => {
			const { field, value } = action.payload;
			return {
				...state,
				[field]: value,
			};
		},
	},
});

export const formActions = formSlice.actions;

export const selectName = state => state.form.name;
export const selectSurname = state => state.form.surname;
export const selectStreet = state => state.form.street;
export const selectAdditional = state => state.form.additional;
export const selectZipCode = state => state.form.zipCode;
export const selectCity = state => state.form.city;
export const selectTel = state => state.form.tel;

export default formSlice.reducer;
