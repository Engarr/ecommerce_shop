import classes from './CategoryBar.module.css';
import { NavLink } from 'react-router-dom';

const CategoryBar = ({ name, onHide }) => {
	return (
		<NavLink
			to={`/category/${name}`}
			onClick={onHide}
			className={({ isActive }) => (isActive ? classes.active : '')}>
			<div className={classes.categoryItem}>
				<div>
					<div>{name}</div>
				</div>
			</div>
		</NavLink>
	);
};

export default CategoryBar;
