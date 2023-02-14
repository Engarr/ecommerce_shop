import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Modal = ({ show, handler }) => {
	// if (!show) return null;

	return ReactDOM.createPortal(
		<div className={classes.backdrop} onClick={handler}></div>,
		document.getElementById('backdrop')
	);
};

export default Modal;
