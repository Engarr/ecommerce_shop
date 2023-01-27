import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Modal = ({ showCart, cartHandler }) => {
	if (!showCart) return null;

	return ReactDOM.createPortal(
		<div className={classes.backdrop} onClick={cartHandler}></div>,
		document.getElementById('backdrop')
	);
};

export default Modal;
