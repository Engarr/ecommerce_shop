import React from 'react';
import classes from './UploadFile.module.css';
import { AiOutlineCloudUpload } from 'react-icons/ai';

const UploadFile = ({ onChange, imageSrcs }) => {
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
				<input id='file-input-0' type='file' onChange={onChange} name='0' />
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
					<input id='file-input-1' type='file' onChange={onChange} name='1' />
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
					<input id='file-input-3' type='file' onChange={onChange} name='2' />
				</div>
			)}
		</div>
	);
};

export default UploadFile;
