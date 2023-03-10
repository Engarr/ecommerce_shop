import React from 'react';
import { Circles } from 'react-loader-spinner';
import classes from './Spiner.module.css';

const Spinner = ({ message }) => {
	return (
		<div className={classes.Spiner}>
			<Circles
				type='Circles'
				color='#00BFFF'
				height={50}
				width={200}
				className='m-5'
			/>
			<p className={classes.text}>{message}</p>
		</div>
	);
};

export default Spinner;
