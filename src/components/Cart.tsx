import React from 'react';
import { ListGroup, Container, Button } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/cart.css';

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, handlePayment }) => {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <Container className="cart-container" style={{ background: "#FFF6EF", border: "2px solid #D35711"}}>
      <h5 style={{ padding: '5px 0 0 0' }} >Carrito de Compras</h5>
      <div className="cart" style={{ background: "#FFF6EF" }}>
        <ListGroup className="cart-list">
          {cart.map((item, index) => (
            <ListGroup.Item key={index} className="cart-item">
              <span>{item.name}</span>

              <div className='cart-item-details'>
                <div className="quantity-controls">
                  <div className="quantity-buttons">
                    <FaMinus size={18} onClick={() => decreaseQuantity(item.id)} />
                    <span className="quantity"> {item.quantity} </span>
                    <FaPlus size={18} onClick={() => increaseQuantity(item.id)} />
                  </div>
                </div>
                <span>${parseFloat(item.price).toFixed(2)}</span>
                <button 
                  className="remove-button" 
                  onClick={() => removeFromCart(index)}
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="cart-footer" style={{ background: "#FFF6EF", padding: '10px 0' }}>
        <div className="total-container">
        <h6 className="total-label">Total:</h6>
        <span className="total-amount">${total.toFixed(2)}</span>
        </div>
        <Button style={{ width: '100%', margin: '10px 0 0 0', background: '#F25C05', borderColor: '#F25C05' }} onClick={handlePayment}> PAGAR </Button>
      </div>
    </Container>
  );
};

export default Cart;
