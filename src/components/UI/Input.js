import React from 'react';
import classes from './Input.module.css';

const Input = ({
	text,
	data,
	value,
	onChange,
	error,
	type,
	message,
	maxLength,
	pattern,
	min,
	max,
}) => {
	return (
		<div className={`${classes.inputBox} ${error ? classes.error : ''}`}>
			<input
				type={type}
				id={data}
				name={data}
				value={value}
				onChange={onChange}
				placeholder={error ? message : 'text'}
				className={classes.input}
				maxLength={maxLength}
				pattern={pattern}
				min={min}
				max={max}
			/>
			<label htmlFor={data} className={classes.label}>
				{text}
			</label>
		</div>
	);
};

export default Input;
