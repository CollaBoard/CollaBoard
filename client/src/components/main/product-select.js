import React from 'react';
import { Link } from 'react-router';

const ProductSelect = () => (
  <div className="product-select-container">
    <Link
      to="/whiteboard"
      className="product-select-link waves-effect waves-light btn-large"
    >
      Whiteboard
    </Link>
    <Link
      to="/texteditor"
      className="product-select-link waves-effect waves-light btn-large"
    >
      Text Editor
    </Link>
  </div>
);

export default ProductSelect;
