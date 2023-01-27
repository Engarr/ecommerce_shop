import classes from './CategoryBar.module.css';
import { Link } from 'react-router-dom';

const CategoryBar = ({ name, onHide }) => {
	return (
		<Link to={`/category/${name}`} onClick={onHide}>
			<div className={classes.categoryItem} >
				<div>
					<div>{name}</div>
				</div>
			</div>
		</Link>
	);
};

export default CategoryBar;
