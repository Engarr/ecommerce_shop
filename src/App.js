import './App.css';
import { Navigate, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail, {loader as loaderDetails } from './components/ProductDetail';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Information from './pages/Information';
import Shipping from './pages/Shipping';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
//////REDUX

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			errorElement: <ErrorPage />,
			children: [
				{ path: '', element: <Navigate to='/home' /> },
				{ path: '/home', element: <Home /> },
				{ path: '/category/:category', element: <Products /> },
				{ path: '/products', element: <Products /> },

				{
					path: '/product/:slug',
					element: <ProductDetail />,
					loader: loaderDetails,
				},

				{ path: '/login', element: <Login /> },
				{ path: '/registration', element: <Registration /> },
				{ path: '/information', element: <Information /> },
				{ path: '/shipping', element: <Shipping /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
