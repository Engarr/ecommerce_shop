import React from 'react';
import { BsFacebook, BsInstagram } from 'react-icons/bs';
import classes from './Footer.module.css';
import { FaEnvelope } from 'react-icons/fa';

const Footer = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	return (
		<div className={classes.footer}>
			<div className={classes.infoContainer}>
				<div className={classes.newsLetter}>
					<div>
						<p>
							Stay up to date with news, promotions and effects and
							recommendations. additionally -15% discount on your first order
						</p>
					</div>
					<div className={classes.inputBox}>
						<input placeholder='Enter your email address' />
						<FaEnvelope  className={classes.envelope}/>
					</div>

					<div className={classes.socialIcons}>
						
						<BsFacebook className={classes.fb} />
						<BsInstagram className={classes.ig} />
					</div>
				</div>
				<div className={classes.faq}>
					<p>FAQ - Frequently asked questions</p>
					<p>10% discount on the second product</p>
					<p>Cooperation</p>
					<p>Opinions</p>
					<p>About us</p>
					<p>BLOG</p>
				</div>
				<div className={classes.more}>
					<h3>More:</h3>
					<p>Privacy policy</p>
					<p>Delivery and shipping</p>
					<p>Newsletter</p>
					<p>Statute</p>
					<p>Contact</p>
				</div>
			</div>

			<div className={classes.year}>
				<p>
					© All rights reserved <time id='current-year'>{year}</time>
				</p>
			</div>
		</div>
	);
};

export default Footer;
