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

export function checkAuthToken({ params }) {
	const token = getAuthToken();
	const userId = getUserId();
	const userIdAccount = params.userId;
	if (!token) {
		return redirect('/login');
	}
	if (userId !== userIdAccount) {
		return redirect(`/profil/${userId}`);
	}

	return null;
}
