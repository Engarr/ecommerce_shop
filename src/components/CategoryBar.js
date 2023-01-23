import classes from './CategoryBar.module.css';
import { Link } from 'react-router-dom';

const CategoryBar = ({name}) => {
	return (
		<div className={classes.categoryItem}>
			<div>
				<Link to={`products/${name}`}>
					<div>{name}</div>
				</Link>
			</div>
		</div>
	);
};

export default CategoryBar;
