import React from 'react';
import { Link } from 'react-router';

const ProductSelect = () => (
  <div className="product-select-container">

    <Link
      to="/whiteboard"
      className="
        grey darken-3
        nav-text
        product-select-link
        waves-effect
        waves-light
        btn-large
        product-select-link"
    >Whiteboard</Link>

    <Link
      to="/texteditor"
      className="
        grey darken-3
        nav-text
        waves-effect
        waves-light
        btn-large
        product-select-link"
    >Text Editor</Link>

  </div>
);

export default ProductSelect;
