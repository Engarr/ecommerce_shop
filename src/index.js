import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateContext } from './context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<StateContext>
				<Toaster />
				<App />
			</StateContext>
		</Provider>
	</React.StrictMode>
);
