import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from './Modal';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import classes from './SearchBox.module.css';

const SearchBox = () => {
	const isSearchVisible = useSelector((state) => state.ui.isSearchVisible);
	const dispatch = useDispatch();
	const searchVisibleHandler = () => {
		dispatch(uiActions.searchHandler());
	};

	return (
		<div>
			<Modal show={isSearchVisible} handler={searchVisibleHandler} />
			<div className={classes.mainContainer}>
				<div className={classes.SearchBox}>
					<div className={classes.inputBox}>
						<IoIosSearch className={classes.icon} />
						<input placeholder='Search' />
					</div>
					<div>
						<AiOutlineClose
							className={classes.closeIcon}
							onClick={searchVisibleHandler}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
