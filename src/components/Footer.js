import React from 'react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import classes from "./Footer.module.css"
const Footer = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	return (
		<div className={classes.footer}>
			<div>
				<p>
					© All rights reserved <time id='current-year'>{year}</time>
				</p>
			</div>
			<div className={classes.socialIcons}>
				<BsFacebook  className={classes.fb} /> <BsInstagram className={classes.ig} />
			</div>
		</div>
	);
};

export default Footer;
