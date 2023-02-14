import React from 'react';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import Modal from './Modal';

import classes from './SearchBox.module.css';

const SearchBox = () => {
	return (
		<div>
			<Modal />
			<div className={classes.mainContainer}>
				<div className={classes.SearchBox}>
					<div className={classes.inputBox}>
						<IoIosSearch className={classes.icon} />
						<input placeholder='Search' />
					</div>
					<div>
						<AiOutlineClose  className={classes.closeIcon}/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchBox;
