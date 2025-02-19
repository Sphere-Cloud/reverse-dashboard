import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import CustomNavbar from '../components/CustomNavbar';
import AddProductModal from '../components/AddProductModal';
import { useNavigate } from 'react-router-dom';

const PointOfSale = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Lista de productos (puedes obtenerla de una API o mantenerla estática)
  const products = [
    {
      "product_id": 1,
      "description": "Producto A",
      "unit_measurement": "pieza",
      "picture": "image_data_here",
      "barcode": "1234567890123",
      "product_is_active": true,
      "category_title": "Categoría 1",
      "batch_id": 1001,
      "batch_name": "Lote A",
      "quantity": "50",
      "price_sale": 10.99,
      "price_purchase": 5.50,
      "inventory_created_at": "2025-02-15 10:00:00",
      "inventory_updated_at": "2025-02-16 12:30:00",
      "inventory_is_active": true
    },
    {
      "product_id": 2,
      "description": "Producto B",
      "unit_measurement": "kg",
      "picture": "image_data_here",
      "barcode": "9876543210987",
      "product_is_active": true,
      "category_title": "Categoría 2",
      "batch_id": 1002,
      "batch_name": "Lote B",
      "quantity": "100",
      "price_sale": 20.99,
      "price_purchase": 12.00,
      "inventory_created_at": "2025-02-14 09:30:00",
      "inventory_updated_at": "2025-02-16 11:15:00",
      "inventory_is_active": true
    }
  ];

  // Filtrar productos según el término de búsqueda
  const filteredProducts = () => {
    if ( searchTerm == '' ) return [];

    return products.filter((product) =>    
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const addToCart = (product) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);
    
    if (productIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[productIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para aumentar la cantidad de un producto en el carrito
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Función para disminuir la cantidad de un producto en el carrito
  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) => {
      if (item.id === productId) {
        // Si la cantidad es mayor que 1, restar 1
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          return null;
        }
      }
      return item;
    }).filter(Boolean); // Filtrar para eliminar los valores null
    setCart(updatedCart);
  };

  

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handlePayment = () => {
    alert('Pago realizado con éxito');
    setCart([]);
  };

  return (
    <Container fluid style={{ height: '100%', padding: '0' }}>
      <Row style={{ height: '10%' }} >
        <CustomNavbar
          actions={
            <>
              <Button variant="secondary" className='secondary' onClick={handleShowModal}>
                Otro Producto
              </Button>
              <Button variant="secondary" className='secondary' onClick={() => { navigate('/panel') }}>
                Cancelar
              </Button>
            </>
          }
        />
      </Row>
      <Row style={{ height: '90%', padding: '15px 0' }}>
        <Col md={8} className="product-section">
          {/* Pasar la función onSearch a SearchBar */}
          <SearchBar onSearch={setSearchTerm} />
          {/* Pasar los productos filtrados a ProductList */}
          <ProductList products={filteredProducts()} addToCart={addToCart} />
        </Col>
        <Col md={4} className="cart-section">
          <Cart cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
        </Col>
      </Row>
      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        addProductToCart={addToCart}
      />
    </Container>
  );
};

export default PointOfSale;