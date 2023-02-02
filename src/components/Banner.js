import React, { useEffect, useState } from 'react';
import { feedBanner } from '../utils/data';
import { urlFor, client } from '../utils/client';
import classes from './Banner.module.css';
import { GrNext, GrPrevious } from 'react-icons/gr';

const Banner = () => {
	const [banner, setBanner] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		client.fetch(feedBanner).then((data) => setBanner(data));
	}, []);

	useEffect(() => {
		
		const interval = setInterval(() => {
			setCurrentIndex((currentIndex + 1) % banner.length);
			
		}, 100000);

		return () => clearInterval(interval);
	}, [currentIndex, banner]);

	const nextBannerHandler = () => {
		setCurrentIndex((currentIndex + 1) % banner.length);
	};
	const prevBannerHandler = () => {
		if (currentIndex === 0) {
			setCurrentIndex(banner.length - 1);
		} else {
			setCurrentIndex((currentIndex - 1) % banner.length);
		}
	};

	return (
		<>
			{banner && (
				<div className={classes.container}>
					<button className={classes.prevBtn}>
						<GrPrevious
							onClick={prevBannerHandler}
							className={classes.btnIcon}
						/>
					</button>
					<button className={classes.nextBtn}>
						<GrNext onClick={nextBannerHandler} className={classes.btnIcon} />
					</button>
					{banner.map((banner, index) => (
						
						<div key={banner?.name}
							className={`${classes.bannerBox} ${
								index === currentIndex ? classes.active : classes.inactive
							}`}>
							<div className={classes.bannerShadow}></div>
							<img
								src={urlFor(banner.image).url()}
								className={classes.bannerImage}
								alt=''
							/>
							<div className={classes.textBox}>
								<h2>{banner.text}</h2>
								<button className={classes.btn}>{banner.buttonText}</button>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Banner