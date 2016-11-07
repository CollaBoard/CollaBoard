import React from 'react';
import { Link } from 'react-router';

const ProductSelect = () => {
	
	return (

		<div className="product-select-container">
			<span className="product-select-link"><Link to="/whiteboard" className="waves-effect waves-light btn-large product-select-link">Whiteboard</Link></span>
			<span className="product-select-link"><Link to="/texteditor" className="waves-effect waves-light btn-large  product-select-link">Text Editor</Link></span>
		</div>

	);
	
}

export default ProductSelect;