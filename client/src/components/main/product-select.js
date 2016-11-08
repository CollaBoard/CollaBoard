import React from 'react';
import { Link } from 'react-router';

const ProductSelect = () => {
	
	return (

		<div className="product-select-container">
			<Link to="/whiteboard" className="product-select-link waves-effect waves-light btn-large product-select-link">Whiteboard</Link>
			<Link to="/texteditor" className="product-select-link waves-effect waves-light btn-large  product-select-link">Text Editor</Link>
		</div>

	);
	
}

export default ProductSelect;
