import React from 'react';
import classes from './CategoryBar.module.css';
const CategoryBar = (props) => {
	return (
		<div className={classes.categoryItem}>
			<div>
				<div>{props.name}</div>
			</div>
		</div>
	);
};

export default CategoryBar;
