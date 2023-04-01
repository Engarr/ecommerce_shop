import React from 'react';
import classes from './Input.module.css';

const Input = ({
	text,
	data,
	defaultValue,
	onChange,
	error,
	type,
	message,
	maxLength,
	min,

	step,
}) => {
	return (
		<div className={`${classes.inputBox} ${error ? classes.error : ''}`}>
			<input
				type={type}
				id={data}
				name={data}
				defaultValue={defaultValue}
				onChange={onChange}
				placeholder={error ? message : 'text'}
				className={classes.input}
				maxLength={maxLength}
				min={min}
				step={step}
			/>
			<label htmlFor={data} className={classes.label}>
				{text}
			</label>
		</div>
	);
};

export default Input;
