import React, { useState } from 'react';
import classes from './UploadFile.module.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UploadFile = () => {
	const [imageSrcs, setImageSrcs] = useState([]);

	const handleFileSelect = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();

		let name = event.target.name;
		reader.onload = (event) => {
			const newImageSrcs = [...imageSrcs];
			newImageSrcs[name] = event.target.result;
			setImageSrcs(newImageSrcs);
		};

		reader.readAsDataURL(file);
	};
	return (
		<div className={classes.photoBox}>
			<div>
				<label htmlFor='file-input-0' className={classes.customFileUpload}>
					{imageSrcs[0] ? (
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
				<input
					id='file-input-0'
					type='file'
					onChange={handleFileSelect}
					name='0'
				/>
			</div>
			{imageSrcs[0] && (
				<div>
					<label htmlFor='file-input-1' className={classes.customFileUpload}>
						{imageSrcs[1] ? (
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
					<input
						id='file-input-1'
						type='file'
						onChange={handleFileSelect}
						name='1'
					/>
				</div>
			)}
			{imageSrcs[1] && (
				<div>
					<label htmlFor='file-input-3' className={classes.customFileUpload}>
						{imageSrcs[2] ? (
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
					<input
						id='file-input-3'
						type='file'
						onChange={handleFileSelect}
						name='2'
					/>
				</div>
			)}
		</div>
	);
};

export default UploadFile;
