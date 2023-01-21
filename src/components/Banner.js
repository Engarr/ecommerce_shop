import React, { useEffect, useState } from 'react';
import { feedBanner } from '../utils/data';
import { urlFor, client } from '../utils/client';
import classes from './Banner.module.css';

const Banner = () => {
	const [banner, setBanner] = useState(null);

	useEffect(() => {
		client.fetch(feedBanner).then((data) => setBanner(data[0]));
	}, []);

	return (
		<>
			{
				banner && (
					// banner.map((banner) => (
					<div className={classes.container}>
						<div className={classes.bannerBox}>
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
					</div>
				)
				// ))}
			}
		</>
	);
};

export default Banner;
