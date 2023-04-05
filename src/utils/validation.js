export const isEmailValid = (email) => {
	let isValid = true;
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(email)) {
		isValid = false;
	}
	return isValid;
};
export const isPasswordValid = (password) => {
	let isValid = true;
	if (password.length < 5) {
		isValid = false;
	}
	if (!/\d/.test(password)) {
		isValid = false;
	}

	if (!/[!@#$%^&*()+=._-]/.test(password)) {
		isValid = false;
	}

	return isValid;
};

export const isRepeatPasswordValid = (password, repeatedPassword) => {
	let isValid = true;
	if (password !== repeatedPassword) {
		isValid = false;
	}
	return isValid;
};
