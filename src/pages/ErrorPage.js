import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import classes from '../styles/ErrorPgae.module.css';
const ErrorPage = () => {
	return (
		<div>
			<NavBar />
			<main className={classes.main}>
				<h2>ERROR 404. PAGE NOT FOUND.</h2>

				<Link to='..' relative='path'>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Back to previous page
				</Link>
			</main>


			<Footer />
		</div>
	);
};

export default ErrorPage;
