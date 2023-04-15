import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import Confirm from '../Confirm/Confirm';
import classes from './UserProduct.module.css';

const UserProduct = ({
	product,
	deleteProduct,
	isDeleting,
	confirmHandler,
}) => {
	return (
		<div key={product.id} className={classes.productBox}>
			<div className={classes.productData}>
				<div>
					<Link to={`/product/${product.id}`}>
						<img src={product.imageUrl} height={80} alt={product.name} />
					</Link>
				</div>
				<div className={classes.nameBox}>
					<p>id: {product.id}</p>
					<p>{product.name}</p>
				</div>
			</div>

			<div className={classes.buttonBox}>
				<Link to={`/product/${product.id}/edit`}>
					<AiOutlineEdit />
				</Link>

				<button onClick={confirmHandler}>
					<AiOutlineDelete />
				</button>
			</div>
			<Confirm
				deleteProduct={deleteProduct}
				productId={product.id}
				isDeleting={isDeleting}
				confirmHandler={confirmHandler}
			/>
		</div>
	);
};

export default UserProduct;
