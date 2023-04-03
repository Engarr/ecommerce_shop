import { redirect } from 'react-router-dom';

export function getAuthToken() {
	const token = localStorage.getItem('token');
	return token;
}
export function getUserId() {
	const userId = localStorage.getItem('userId');
	return userId;
}

export function tokenLoader() {
	return getAuthToken();
}

export function checkAuthToken() {
	const token = getAuthToken();
	if (!token) {
		return redirect('/login');
	}
	return null;
}
