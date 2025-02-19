import React from 'react';
import { ListGroup, Container } from 'react-bootstrap';
import '../styles/product-list.css';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className="product-container">
      <ListGroup className="product-list">
        {products.map((product) => (
          <ListGroup.Item
            key={product.product_id}
            action
            onClick={() => addToCart(
              { 
                id: product.product_id,
                name: product.description,
                price: product.price_sale,
                purchasePrice: product.price_purchase,
                quantity: 1
              }
            )}
            className='list-item'
          >
            <span> {product.description} </span>
            <span> ${product.price_sale.toFixed(2)} </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProductList;