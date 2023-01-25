import classes from './CategoryBar.module.css';
import { Link } from 'react-router-dom';

const CategoryBar = ({ name, onHide }) => {
	return (
		<Link to={`/category/${name}`}>
			<div className={classes.categoryItem} onClick={onHide}>
				<div>
					<div>{name}</div>
				</div>
			</div>
		</Link>
	);
};

export default CategoryBar;
