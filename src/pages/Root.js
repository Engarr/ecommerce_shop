import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SearchBox from '../components/SearchBox';
import { useSelector } from 'react-redux';
import Footer from '../components/Footer';

const RootLayout = () => {
	const isSearchVisible = useSelector((state) => state.ui.isSearchVisible);
	return (
		<>
			<NavBar />
			{isSearchVisible && <SearchBox />}
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default RootLayout;
