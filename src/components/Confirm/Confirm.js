import React from 'react';
import classes from './Confirm.module.css';

const Confirm = ({ productId, deleteProduct, isDeleting, confirmHandler }) => {
	return (
		<>
			{isDeleting && (
				<div className={classes.confirmContainer}>
					<div>
						<p>Do you really want to remove the product?</p>
					</div>
					<div>
						<button onClick={() => deleteProduct(productId)}>Yes</button>
						<button onClick={confirmHandler}>No</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Confirm;
