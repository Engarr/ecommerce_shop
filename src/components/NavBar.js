import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import { BsBag } from 'react-icons/bs';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import CategoryBar from './CategoryBar';
import { AiOutlineClose } from 'react-icons/ai';

const Dummy_category = [
	{ name: 'Jednoczęściowe', id: 'm1' },
	{ name: 'Dwuczęściowe', id: 'm2' },
	{ name: 'Kąpielówki', id: 'm3' },
	{ name: 'Tuniki', id: 'm4' },
];

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
								<p>Koszyk</p>
							</div>
							<div className={classes.profileBoxSmall}>
								<RiAccountPinCircleFill size={25} />
								<p>Zaloguj się</p>
							</div>
						</div>
						<div className={classes.searchBoxSmall}>
							<input />
							<IoIosSearch className={classes.searchIconSmall} />
						</div>
						<div className={classes.catogoryBoxSmall}>
							{Dummy_category?.map((category) => (
								<CategoryBar key={category.id} name={category.name} />
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
							<p>Koszyk</p>
						</div>
						<div className={classes.profileBoxBig}>
							<RiAccountPinCircleFill size={30} />
							<p>Zaloguj się</p>
						</div>
					</div>
				</div>
				<div className={classes.catogoryBoxBig}>
					{Dummy_category?.map((category) => (
						<CategoryBar key={category.id} name={category.name} />
					))}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
