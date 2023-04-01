import React, { useState, useEffect } from 'react';
import classes from './UploadFile.module.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UploadFile = ({ onChange, imageSrcs, prodData }) => {
	const [imagesLinks, setImagesLinks] = useState([]);

	useEffect(() => {
		if (prodData) {
			const images = prodData.imageUrl;
			const prefix = 'http://localhost:8080/';
			const newArr = images.map((image) => prefix + image);
			setImagesLinks(newArr);
		}
		// eslint-disable-next-line
	}, [prodData]);

	return (
		<div className={classes.photoBox}>
			<div>
				<label htmlFor='file-input-0' className={classes.customFileUpload}>
					{imagesLinks.length > 0 ? (
						<img
							src={imagesLinks[0]}
							alt='Uploaded'
							className={classes.addedImg}
							height={250}
						/>
					) : imageSrcs.length > 0 ? (
						<img
							src={imageSrcs[0]}
							alt='Uploaded'
							className={classes.addedImg}
							height={250}
						/>
					) : (
						<p>
							<AiOutlineCloudUpload className={classes.uploadIcon} />
							<span>Chose Photo</span>
						</p>
					)}
				</label>
				<input id='file-input-0' type='file' onChange={onChange} name='0' />
			</div>

			{imagesLinks[0] || imageSrcs[0] ? (
				<div>
					<label htmlFor='file-input-1' className={classes.customFileUpload}>
						{imagesLinks.length > 1 ? (
							<img
								src={imagesLinks[1]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : imageSrcs.length > 1 ? (
							<img
								src={imageSrcs[1]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : (
							<p>
								<AiOutlineCloudUpload className={classes.uploadIcon} />
								<span>Chose Photo</span>
							</p>
						)}
					</label>
					<input id='file-input-1' type='file' onChange={onChange} name='1' />
				</div>
			) : null}
			{imagesLinks[1] || imageSrcs[1] ? (
				<div>
					<label htmlFor='file-input-2' className={classes.customFileUpload}>
						{imagesLinks.length > 2 ? (
							<img
								src={imagesLinks[2]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : imageSrcs.length > 2 ? (
							<img
								src={imageSrcs[2]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : (
							<p>
								<AiOutlineCloudUpload className={classes.uploadIcon} />
								<span>Chose Photo</span>
							</p>
						)}
					</label>
					<input id='file-input-2' type='file' onChange={onChange} name='2' />
				</div>
			) : null}
		</div>
	);
};

export default UploadFile;
