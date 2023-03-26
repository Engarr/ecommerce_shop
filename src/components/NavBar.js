import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from 'react';
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
import { toast } from 'react-hot-toast';
import ProfilCard from './ProfilCard';
import Transition from 'react-transition-group/Transition';
import { client, urlFor } from '../utils/client';

import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice';

const NavBar = () => {
	const [hide, setHide] = useState(true);
	const [showProfilCard, setShowProfilCard] = useState(false);
	const [isClassAdded, setIsClassAdded] = useState(false);
	const [image, setImage] = useState([]);
	const { setUserData } = useStateContext();
	const cardRef = useRef();
	////////////// REDUX
	const dispatch = useDispatch();
	const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
	const totalQuantity = useSelector((state) => state.cartItems.totalQuantity);

	const searchVisibleHandler = () => {
		dispatch(uiActions.searchHandler());
	};

	const showCartHandler = () => {
		dispatch(uiActions.cartHandler());
	};

	////////////// REDUX

	const menuHandler = () => {
		setHide((prev) => (prev = !prev));
	};

	const profilActionHandler = useCallback(() => {
		setShowProfilCard((prev) => !prev);
	}, [setShowProfilCard]);

	const imageUrl = useMemo(() => {
		return image[0]?.image && urlFor(image[0].image).url();
	}, [image]);

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
		if (!cardRef.current) return;

		if (!cardRef.current.contains(event.target)) {
			setShowProfilCard(false);
		}
	};

	const logout = useCallback(() => {
		localStorage.removeItem('userInfo');
		setShowProfilCard(false);
		setUserData([]);
		toast.success(`You have successfully logged out. See You soon!`);
	}, [setUserData]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsClassAdded(true);
			setTimeout(() => {
				setIsClassAdded(false);
			}, 400);
		}, 400);
		return () => clearTimeout(timeout);
	}, [totalQuantity]);

	useEffect(() => {
		let query = '*[_type == "photo"]';
		client.fetch(query).then((data) => setImage(data));
	}, []);
	return (
		<div className={classes.container}>
			<div className={classes.heroShadow}></div>
			<img src={imageUrl} className={classes.heroImg} alt={image.name} />

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
									showCartHandler();
									menuHandler();
								}}>
								<BsBag size={25} />
								{totalQuantity !== 0 && (
									<div className={classes.smallCartQty}>{totalQuantity}</div>
								)}
								<p>Cart</p>
							</div>

							<div ref={cardRef} className={classes.profileContainer}>
								<div
									className={classes.profileBoxSmall}
									onClick={profilActionHandler}>
									<div className={classes.icon}>
										<RiAccountPinCircleFill size={35} />
										<p>Profil</p>
									</div>
								</div>
								<div>
									<ProfilCard
										showProfilCard={showProfilCard}
										logout={logout}
										profilActionHandler={profilActionHandler}
									/>
								</div>
							</div>
						</div>
						<div className={classes.searchBoxSmall}>
							<IoIosSearch
								className={classes.searchIconSmall}
								onClick={searchVisibleHandler}
							/>
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
						<IoIosSearch
							className={classes.searchIconBig}
							onClick={searchVisibleHandler}
						/>
					</div>
					<div className={classes.logoBig}>
						<Link to='/'>WOSMOD</Link>
					</div>
					<div className={classes.accountBoxBig}>
						<div className={classes.cartBoxBig} onClick={showCartHandler}>
							<BsBag size={30} />
							{totalQuantity !== 0 && (
								<div
									className={`${classes.bigCartQty} ${
										isClassAdded ? classes.shake : ''
									}`}>
									{totalQuantity}
								</div>
							)}
							<p>Cart</p>
						</div>
						<div ref={cardRef} className={classes.profileContainer}>
							<div
								className={classes.profileBoxBig}
								onClick={profilActionHandler}>
								<div className={classes.icon}>
									<RiAccountPinCircleFill size={35} />
									<p>Profil</p>
								</div>
							</div>
							<div>
								<ProfilCard
									showProfilCard={showProfilCard}
									logout={logout}
									profilActionHandler={profilActionHandler}
								/>
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
			<Transition mountOnEnter unmountOnExit in={cartIsVisible} timeout={400}>
				{(state) => <Cart show={state} />}
			</Transition>
		</div>
	);
};

export default NavBar;
