import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

const fetchUserDataFromLocalStorage = JSON.parse(
	localStorage.getItem('userInfo') || '[]'
);

export const StateContext = ({ children }) => {
	
	const [userData, setUserData] = useState(fetchUserDataFromLocalStorage);
	const [isLogin, setIsLogin] = useState(false);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [street, setStreet] = useState('');
	const [additional, setAdditional] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [city, setCity] = useState('');
	const [tel, setTel] = useState('');

	

	const emailHandler = (e) => {
		setEmail(e.target.value);
	};
	const nameHandler = (e) => {
		setName(e.target.value);
	};
	const surnameHandler = (e) => {
		setSurname(e.target.value);
	};
	const streetHandler = (e) => {
		setStreet(e.target.value);
	};
	const zipCodeHandler = (e) => {
		setZipCode(e.target.value);
	};
	const cityHandler = (e) => {
		setCity(e.target.value);
	};
	const telHandler = (e) => {
		setTel(e.target.value);
	};
	const additionalHandler = (e) => {
		setAdditional(e.target.value);
	};

	

	useEffect(() => {
		localStorage.setItem('userInfo', JSON.stringify(userData));
		if (userData.length === 0) {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, [userData]);




	return (
		<Context.Provider
			value={{
										
				userData,
				setUserData,
				setIsLogin,
				isLogin,
				email,
				emailHandler,
				nameHandler,
				surnameHandler,
				streetHandler,
				zipCodeHandler,
				cityHandler,
				telHandler,
				additionalHandler,
				name,
				surname,
				city,
				tel,
				zipCode,
				street,
				additional,
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
