import { ListGroup, Container, Button } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/cart.css';

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
  price_sale?: number; // Añadí price_sale para que funcione el ejemplo
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

interface CartItem {
  product: Product;
  inventory: Inventory;
  quantity: number;
}

interface CartProps{
  cart: CartItem[],
  removeFromCart: (index: number) => void,
  increaseQuantity: (productId: number) => void,
  decreaseQuantity: (productId: number) => void,
  handlePayment: () => void
}

const Cart = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity, handlePayment}: CartProps) => {

  const total = cart.reduce((sum, item) => sum + item.inventory.price_sale * item.quantity, 0);

  return (
    <Container className="cart-container" style={{ background: "#FFF6EF", border: "2px solid #D35711"}}>
      <h5 style={{ padding: '5px 0 0 0' }} >Carrito de Compras</h5>
      <div className="cart" style={{ background: "#FFF6EF" }}>
        <ListGroup className="cart-list">
          {cart.map((item, index) => (
            <ListGroup.Item key={index} className="cart-item">
              <span>{item.product.description}</span>

              <div className='cart-item-details'>
                <div className="quantity-controls">
                  <div className="quantity-buttons">
                    <FaMinus size={18} onClick={() => decreaseQuantity(item.product.id)} />
                    <span className="quantity"> {item.quantity} </span>
                    <FaPlus size={18} onClick={() => increaseQuantity(item.product.id)} />
                  </div>
                </div>
                <span>${item.inventory.price_sale.toFixed(2)}</span>
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
