import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import { BsBag } from 'react-icons/bs';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import CategoryBar from './CategoryBar';
import { AiOutlineClose } from 'react-icons/ai';
import { categories } from '../utils/data';

const NavBar = () => {
	const [hide, setHide] = useState(true);

	const menuHandler = () => {
		setHide((prev) => (prev = !prev));
	};

	return (
		<div>
			<div className={classes.smallDevices}>
				<div className={classes.mainSmall}>
					<div className={classes.logoSmall}>
						<Link to='/'>WOSMOD</Link>
					</div>
					<GiHamburgerMenu
						className={classes.burgerIcon}
						onClick={menuHandler}
					/>
				</div>

				{!hide && (
					<div className={classes.navSmallBox}>
						<h2>Menu</h2>
						<AiOutlineClose
							className={classes.closeBtn}
							onClick={menuHandler}
						/>

						<div className={classes.accountBoxSmall}>
							<div className={classes.cartBoxSmall}>
								<BsBag size={25} />
								<p>Cart</p>
							</div>
							<div className={classes.profileBoxSmall}>
								<RiAccountPinCircleFill size={25} />
								<p>Login</p>
							</div>
						</div>
						<div className={classes.searchBoxSmall}>
							<input />
							<IoIosSearch className={classes.searchIconSmall} />
						</div>
						<div className={classes.catogoryBoxSmall}>
							{categories?.map((category) => (
								<CategoryBar key={category.name} name={category.name} />
							))}
						</div>
					</div>
				)}
			</div>

			<div className={classes.bigDevices}>
				<div className={classes.mainBig}>
					<div className={classes.searchBox}>
						<input />
						<IoIosSearch className={classes.searchIconBig} />
					</div>
					<div className={classes.logoBig}>
						<Link to='/'>WOSMOD</Link>
					</div>
					<div className={classes.accountBoxBig}>
						<div className={classes.cartBoxBig}>
							<BsBag size={30} />
							<p>Cart</p>
						</div>
						<div className={classes.profileBoxBig}>
							<RiAccountPinCircleFill size={30} />
							<p>Login</p>
						</div>
					</div>
				</div>
				<div className={classes.catogoryBoxBig}>
					{categories?.map((category) => (
						<CategoryBar key={category.name} name={category.name} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NavBar;