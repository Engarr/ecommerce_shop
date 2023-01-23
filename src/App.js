import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import NavBar from './components/NavBar';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';

function App() {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<main>
				<Routes>
					{/* <Route path='/*' element={<Navigate to='/' />} /> */}
					<Route path='/' element={<Home />} />
					<Route path='/products/:slug' element={<Products />} />
					<Route path='/product/:slug' element={<ProductDetail />} />
				</Routes>
			</main>
			<footer>
				<Footer/>
			</footer>
		</div>
	);
}

export default App;
