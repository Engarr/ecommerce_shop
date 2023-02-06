import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import NavBar from './components/NavBar';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Information from './pages/Information';

function App() {
	return (
		<>
			<header>
				<NavBar />
			</header>
			<main>
				<Routes>
					<Route path='/*' element={<Navigate to='/home' />} />
					<Route path='/home' element={<Home />} />
					<Route path='/category/:category' element={<Products />} />
					<Route path='/products' element={<Products />} />
					<Route path='/product/:slug' element={<ProductDetail />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/Information' element={<Information />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}

export default App;
