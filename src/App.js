import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Products from './pages/Products';
import NavBar from './components/NavBar';

function App() {
	return (
		<div>
			<header>
				<NavBar />
			</header>
			<main>
				<Routes>
					<Route path='/*' element={<Navigate to='/' />} />
					<Route path='/' element={<Home />} />
					<Route path='/products' element={<Products />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
