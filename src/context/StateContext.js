import React, { createContext, useContext, useEffect, useState } from 'react';

const Context = createContext();

const fetchUserDataFromLocalStorage = JSON.parse(
	localStorage.getItem('userInfo') || '[]'
);

export const StateContext = ({ children }) => {
	const [userData, setUserData] = useState(fetchUserDataFromLocalStorage);
	const [isLogin, setIsLogin] = useState(false);

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
			}}>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);
