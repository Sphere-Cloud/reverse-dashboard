import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface CartItem {
  product: Product;
  inventory: Inventory;
  quantity: number;
}

interface Product {
  id: number;
  company_id: number | null;
  category_id: number | null;
  description: string;
  unit_measurement?: string;
  picture?: Uint8Array;
  created_at: Date;
  updated_at: Date;
  barcode?: string;
  is_active: boolean;
  price_sale?: number;
}

interface Inventory {
  id: number;
  company_id: number | null;
  batch_id?: number;
  batch_name?: string;
  product_id: number;
  quantity: number;
  price_sale: number;
  price_purchase: number;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
  is_active: boolean;
}

// Definimos las props del componente
interface AddProductModalProps {
  show: boolean;
  handleClose: () => void;
  addProductToCart: (cartItem: CartItem) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ show, handleClose, addProductToCart }) => {
  // Estado para manejar los datos del producto
  const [product, setProduct] = useState<Product>({
    id: 0,
    company_id: null,
    category_id: null,
    description: '',
    unit_measurement: '',
    created_at: new Date(),
    updated_at: new Date(),
    barcode: '',
    is_active: true,
    price_sale: 0,
  });

  // Estado para manejar la cantidad del producto
  const [quantity, setQuantity] = useState<number>(1);

  // Manejador de cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setQuantity(Number(value));
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Crear un inventario ficticio para el producto personalizado
    const customInventory: Inventory = {
      id: 0, // ID ficticio
      company_id: null,
      product_id: product.id,
      quantity: 100, // Cantidad ficticia
      price_sale: product.price_sale || 0,
      price_purchase: 0, // Precio de compra ficticio
      created_by: null,
      created_at: new Date(),
      updated_by: null,
      updated_at: new Date(),
      is_active: true,
    };

    // Crear el CartItem
    const cartItem: CartItem = {
      product: product,
      inventory: customInventory,
      quantity: quantity,
    };

    // Agregar el producto al carrito
    addProductToCart(cartItem);
    handleClose(); // Cerrar el modal después de enviar
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Producto Personalizado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Campo para la descripción del producto */}
          <Form.Group controlId="formProductDescription">
            <Form.Label>Descripción del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción del producto"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Campo para el precio del producto */}
          <Form.Group controlId="formProductPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese el precio del producto"
              name="price_sale"
              value={product.price_sale}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          {/* Campo para la cantidad del producto */}
          <Form.Group controlId="formProductQuantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingrese la cantidad"
              name="quantity"
              value={quantity}
              onChange={handleInputChange}
              min="1"
              required
            />
          </Form.Group>

          {/* Botón para enviar el formulario */}
          <Button
            type="submit"
            style={{ width: '100%', margin: '10px 0 0 0', background: '#F25C05', borderColor: '#F25C05' }}
          >
            AGREGAR
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;