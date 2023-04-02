import React from 'react';
import classes from './UploadFile.module.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UploadFile = ({ onChange, imageSrcs, prodData }) => {
	return (
		<div className={classes.photoBox}>
			<div>
				<label htmlFor='file-input-0' className={classes.customFileUpload}>
					{imageSrcs.length > 0 ? (
						<img
							src={imageSrcs[0]}
							alt='Uploaded'
							className={classes.addedImg}
							height={250}
						/>
					) : (
						<p>
							<AiOutlineCloudUpload className={classes.uploadIcon} />
							<span>Choose Photo</span>
						</p>
					)}
				</label>
				<input id='file-input-0' type='file' onChange={onChange} name='0' />
			</div>

			{imageSrcs[0] || imageSrcs[0] ? (
				<div>
					<label htmlFor='file-input-1' className={classes.customFileUpload}>
						{imageSrcs.length > 1 ? (
							<img
								src={imageSrcs[1]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : (
							<p>
								<AiOutlineCloudUpload className={classes.uploadIcon} />
								<span>Choose Photo</span>
							</p>
						)}
					</label>
					<input id='file-input-1' type='file' onChange={onChange} name='1' />
				</div>
			) : null}
			{imageSrcs[1] || imageSrcs[1] ? (
				<div>
					<label htmlFor='file-input-2' className={classes.customFileUpload}>
						{imageSrcs.length > 2 ? (
							<img
								src={imageSrcs[2]}
								alt='Uploaded'
								className={classes.addedImg}
								height={250}
							/>
						) : (
							<p>
								<AiOutlineCloudUpload className={classes.uploadIcon} />
								<span>Choose Photo</span>
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
