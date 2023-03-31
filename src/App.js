import './App.css';
import { Navigate, RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail, {
	loader as loaderDetails,
} from './components/ProductDetail';
import Login from './pages/Login';
import Registration from './pages/Registration'; // {action as registrationAction}
import Information from './pages/Information';
import Shipping from './pages/Shipping';
import RootLayout from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import UserPage from './pages/UserPage';
import NewProduct from './pages/NewProduct';
import { checkAuthToken, tokenLoader } from './utils/auth';
import { action as logoutaAction } from './pages/Logout';

//////REDUX

function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			errorElement: <ErrorPage />,
			id: 'root',
			loader: tokenLoader,
			children: [
				{ path: '', element: <Navigate to='/home' /> },
				{ path: '/home', element: <Home /> },
				{ path: '/category/:category', element: <Products /> },
				{ path: '/products', element: <Products /> },

				{
					path: '/product/:productId',
					element: <ProductDetail />,
					loader: loaderDetails,
				},

				{ path: '/login', element: <Login /> },
				{
					path: '/registration',
					element: <Registration />,
					// action: registrationAction,
				},
				{ path: '/information', element: <Information /> },
				{ path: '/shipping', element: <Shipping /> },
				{ path: '/logout', action: logoutaAction },
				{
					path: '/profil/:userId',
					element: <UserPage />,
					loader: checkAuthToken,
				},
				{ path: '/add-product/:userId', element: <NewProduct /> },
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;
