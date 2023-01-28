import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css';
import { IoIosSearch } from 'react-icons/io';
import { BsBag } from 'react-icons/bs';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import CategoryBar from './CategoryBar';
import { AiOutlineClose } from 'react-icons/ai';
import { categories } from '../utils/data';
import { useStateContext } from '../context/StateContext';
import Cart from './Cart';

const NavBar = () => {
	const [hide, setHide] = useState(true);
	const [showProfilCard, setShowProfilCard] = useState(false);
	const { showCart, cartHandler, totalQuantities } = useStateContext();

	const cardRef = useRef(null);

	const menuHandler = () => {
		setHide((prev) => (prev = !prev));
	};

	const profilActionHandler = () => {
		setShowProfilCard((prev) => !prev);
	};

	useEffect(() => {
		if (showProfilCard) {
			document.addEventListener('click', clickHandler);
		} else {
			document.removeEventListener('click', clickHandler);
		}
		return () => {
			document.removeEventListener('click', clickHandler);
		};
	}, [showProfilCard]);

	const clickHandler = (event) => {
		
		if (!cardRef.current.contains(event.target)) {
			
			setShowProfilCard(false);
		}
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
							<div
								className={classes.cartBoxSmall}
								onClick={() => {
									cartHandler();
									menuHandler();
								}}>
								<BsBag size={25} />
								{totalQuantities !== 0 && (
									<div className={classes.smallCartQty}>{totalQuantities}</div>
								)}

								<p>Cart</p>
							</div>
							<div className={classes.profileBoxSmall}>
								<RiAccountPinCircleFill size={25} />
								<p>Profil</p>
							</div>
						</div>
						<div className={classes.searchBoxSmall}>
							<input />
							<IoIosSearch className={classes.searchIconSmall} />
						</div>
						<div className={classes.catogoryBoxSmall}>
							{categories?.map((category) => (
								<CategoryBar
									key={category.name}
									name={category.name}
									onHide={menuHandler}
								/>
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
						<div className={classes.cartBoxBig} onClick={cartHandler}>
							<BsBag size={30} />
							{totalQuantities !== 0 && (
								<div className={classes.bigCartQty}>{totalQuantities}</div>
							)}

							<p>Cart</p>
						</div>

						<div ref={cardRef} className={classes.profileContainer} >
							<div
								className={classes.profileBoxBig}
								onClick={profilActionHandler}>
								<div className={classes.icon}>
									<RiAccountPinCircleFill size={35} />
									<p>Profil</p>
								</div>
							</div>

							<div>
								{showProfilCard && (
									<div className={classes.profilAcctionContainer}>
										<div>
											<Link to='/login'>
												<button type='button' onClick={profilActionHandler}>
													Login
												</button>
											</Link>
										</div>

										<p>Don't have account?</p>

										<div>
											<Link to='/registration'>
												<button type='button' onClick={profilActionHandler}>Create account</button>
											</Link>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className={classes.catogoryBoxBig}>
					{categories?.map((category) => (
						<CategoryBar key={category.name} name={category.name} />
					))}
				</div>
			</div>
			{showCart && <Cart />}
		</div>
	);
};

export default NavBar;
