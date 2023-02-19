import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useRouteError } from 'react-router';

import classes from '../styles/ErrorPgae.module.css';

const ErrorPage = () => {
	const error = useRouteError();
	let title = 'An error occurred!';
	let message = 'Something went wrong!';
	let buttonText = 'products';
	let linktText = '/products';

	if (error.status === 500) {
		message = error.data.message;
	}
	if (error.status === 404) {
		title = 'Not Found';
		message = 'Could not find resource or page';
		linktText = '/';
		buttonText = 'home';
	}
	return (
		<div>
			<NavBar />
			<main className={classes.main}>
				<h2>{title}</h2>
				<p>{message}</p>
				<Link to={linktText} relative='path'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Back to {buttonText} page
				</Link>
			</main>

			<Footer />
		</div>
	);
};

export default ErrorPage;
