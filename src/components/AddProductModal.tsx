import React, { useState } from 'react';
import { Modal, Button, Form, Container } from 'react-bootstrap';

const AddProductModal = ({ show, handleClose, addProductToCart }) => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    quantity: 1,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the product to the cart
    addProductToCart(product);
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto al Carrito</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del producto"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductQuantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la cantidad"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              min="1"
              required
            />
          </Form.Group>

          <Button type='submit' style={{ width: '100%', margin: '10px 0 0 0', background: '#F25C05', borderColor: '#F25C05' }}> AGREGAR </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;