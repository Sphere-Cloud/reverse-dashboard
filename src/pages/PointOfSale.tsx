import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import CustomNavbar from '../components/CustomNavbar';
import AddProductModal from '../components/AddProductModal';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import logo from '/reverse.png';
import LoadingSecondary from '../components/LoadingSecondary';
import axios from 'axios';


const PointOfSale = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  // Lista de productos (puedes obtenerla de una API o mantenerla estática)
  const [ products, setProducts ] = useState([]);
  
  // Obtener el rol del usuario desde el localStorage o desde la API
  useEffect(() => {
    
    const fetchProducts = async () => {
        try {
            // Espera la respuesta de la solicitud
            const response = await axios.get(`http://78.13.0.202:8080/products/`);

            if (response.data == null) {
                setProducts([]);
            } else {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Error obteniendo el rol del usuario:", error);
            setProducts([]);
        }
    };

    // Llama a la función asíncrona
    fetchProducts();
    
  }, []); // Solo se ejecuta una vez al cargar el componente


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

  const [isPaying, setIsPaying] = useState(false);
  
  const handlePayment = () => {
    setIsPaying(!isPaying);
  };

  const calcTotal = () => {
    return cart.reduce((sum, item) => sum + parseFloat(item.price), 0)
  };


  const [paymentMethods, setPaymentMethods] = useState([
    { method: '', amount: '' },
  ]);

  const handleMethodChange = (index, e) => {
    const newPaymentMethods = [...paymentMethods];
    newPaymentMethods[index].method = e.target.value;
    setPaymentMethods(newPaymentMethods);
  };

  const handleAmountChange = (index, e) => {
    const newPaymentMethods = [...paymentMethods];
    newPaymentMethods[index].amount = e.target.value;
    setPaymentMethods(newPaymentMethods);
  };

  const addPaymentMethod = () => {
    setPaymentMethods([...paymentMethods, { method: '', amount: '' }]);
  };


  // Función para calcular la posición X para justificar a la derecha
  const getRightAlignX = (doc, text, marginRight = 2, pageWidth = 80) => {
    const textWidth = doc.getTextWidth(text); // Medir el ancho del texto
    return pageWidth - textWidth - marginRight; // Posición X para alinear a la derecha
  };

  // Función para calcular la posición X para centrar el texto
  const getCenterAlignX = (doc, text, pageWidth = 80) => {
    const textWidth = doc.getTextWidth(text); // Medir el ancho del texto
    return (pageWidth - textWidth) / 2; // Posición X para centrar el texto
  };

  const generateTicket = (data) => {
    const doc = new jsPDF("p", "mm", [80, 297]); // Ancho de 80mm, Alto ajustable (similar a un A4)
  
    const imageWidth = 30; // Ancho de la imagen
    const pageWidth = 80; // Ancho de la página
  
    // Calcular la posición X para centrar la imagen
    const xPosition = (pageWidth - imageWidth) / 2;
  
    // Agregar logo centrado
    doc.addImage(logo, "PNG", xPosition, 2, imageWidth, 20); // Dinamico
    
    // Información del negocio
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
  
    // Centrar textos
    const companyName = data.companyName;  // Dinamico
    const address = data.address; //Dinamico
    const postalCode = data.postalCode; //Dinamico
    const phoneNumber = "TEL: " + data.phoneNumber; //Dinamico
    const seller = "ATENDIO: " + data.seller; // Dinamico
    const ticketNumber = "NO. " + data.ticketNumber; //Dinamico
    const date = data.date; //Dinamico
    const clientNumber = data.clientNumber; //Dinamico
    const clientName = data.clientName; //Dinamico
  
    const subtotalAmount = data.subtotalAmount; //Dinamico
    const discountAmount = data.discountAmount; //Dinamico
    const taxesAmount = data.taxesAmount; //Dinamico
    const totalAmount = data.totalAmount; //Dinamico
    const paymentAmount = data.paymentAmount; //DInamico
    const changeAmount = data.changeAmount; //Dinamico
    const cashAmount = data.cashAmount; //Dinamico
  
    // Términos y condiciones, información del sitio web
    const termsText = "AL PAGAR ACEPTO LOS TERMINOS DE VENTA";
    const returnPolicyText = "DEVOLUCION Y GARANTÍA EXHIBIDOS EN TIENDA";
    const websiteText = data.website; //Dinamico
  
    // Usamos getCenterAlignX para calcular las posiciones centradas
    const xPositionCompany = getCenterAlignX(doc, companyName); // Centrar nombre de la empresa
    const xPositionAddress = getCenterAlignX(doc, address); // Centrar dirección
    const xPositionPostalCode = getCenterAlignX(doc, postalCode); // Centrar código postal
    const xPositionPhone = getCenterAlignX(doc, phoneNumber); // Centrar teléfono
    const xPositionSeller = getCenterAlignX(doc, seller);
    const xPositionTerms = getCenterAlignX(doc, termsText); // Posición X para centrar el texto
    const xPositionPolicy = getCenterAlignX(doc, returnPolicyText); // Posición X para centrar el texto
    const xPositionWebsite = getCenterAlignX(doc, websiteText); // Posición X para centrar el texto
  
    // Usamos getRightAlignX para cacular las posiciones justificadas a la derecha
    const xPositionDate = getRightAlignX(doc, date); // Justificar a la derecha la fecha
    const xPositionClientName = getRightAlignX(doc, clientName); // Justificar a la derecha el nombre del cliente
    const xPositionSubtotal = getRightAlignX(doc, subtotalAmount); // Posición X para el subtotal
    const xPositionDiscount = getRightAlignX(doc, discountAmount); // Posición X para descuento
    const xPositionTaxes = getRightAlignX(doc, taxesAmount); // Posición X para impuestos
    const xPositionTotal = getRightAlignX(doc, totalAmount); // Posición X para total
    const xPositionPayment = getRightAlignX(doc, paymentAmount); // Posición X para pago
    const xPositionChange = getRightAlignX(doc, changeAmount); // Posición X para cambio
    const xPositionCash = getRightAlignX(doc, cashAmount); // Posición X para efectivo
  
    // Imprimir los textos centrados
    let yPosition = 25; // Iniciamos desde la posición Y para el primer texto
    doc.text(companyName, xPositionCompany, yPosition); // Nombre de la empresa
    yPosition += 5;
    doc.text(address, xPositionAddress, yPosition); // Dirección
    yPosition += 5;
    doc.text(postalCode, xPositionPostalCode, yPosition); // Código Postal
    yPosition += 5;
    doc.text(phoneNumber, xPositionPhone, yPosition); // Teléfono
    yPosition += 5; // Se agrega un espacio extra después de la información del negocio
    
    // Nombre del vendedor
    doc.text(seller, xPositionSeller, yPosition); // Vendedor
    yPosition += 10;
  
    // Detalles de la venta
    doc.text(ticketNumber, 2, yPosition); // Número de venta
    doc.text(date, xPositionDate, yPosition); // Fecha y hora
    yPosition += 5;
  
    doc.text(clientNumber, 2, yPosition); // Número de cliente
    doc.text(clientName, xPositionClientName, yPosition); // Nombre del cliente
    yPosition += 5;
  
    // Separador
    doc.line(2, yPosition, 78, yPosition); // Línea horizontal de separación
    yPosition += 5;
  
    // Detalles de los productos
    data.products.forEach((product, index) => {
      const productText = `${product.cantidad}.00 - `;
      const skuText = `${product.sku}`;
      const descriptionText = ` ${product.descripcion}`;
  
      // Mostrar cantidad y guion
      doc.text(productText, 2, yPosition);
  
      // SKU en negritas
      doc.setFont("helvetica", "bold");
      doc.text(skuText, doc.getTextWidth(productText) + 2, yPosition);
  
      // Volver a fuente normal y mostrar la descripción
      doc.setFont("helvetica", "normal");
      doc.text(descriptionText, doc.getTextWidth(productText + skuText) + 4, yPosition);
  
      // Mostrar precio alineado a la derecha
      const totalProduct = `$${product.precioTotal.toFixed(2)}`;
      const xPositionTotalProduct = getRightAlignX(doc, totalProduct);
      doc.text(totalProduct, xPositionTotalProduct, yPosition); 
  
      yPosition += 5; // Incrementar la posición para el siguiente producto
    });
  
    // Separador
    doc.line(2, yPosition, 78, yPosition); // Línea de separación
    yPosition += 5;
    
    // Subtotales, descuentos, impuestos
    doc.text("Subtotal:", 2, yPosition);
    doc.text(subtotalAmount, xPositionSubtotal, yPosition);
    yPosition += 5;
    doc.text("Descuento:", 2, yPosition);
    doc.text(discountAmount, xPositionDiscount, yPosition);
    yPosition += 5;
    doc.text("Impuestos:", 2, yPosition);
    doc.text(taxesAmount, xPositionTaxes, yPosition);
    yPosition += 5;
  
    // Línea de total
    doc.line(2, yPosition, 78, yPosition); // Línea de separación
    yPosition += 5;
    doc.text("Total:", 2, yPosition);
    doc.text(totalAmount, xPositionTotal, yPosition);
    yPosition += 5;
    doc.line(2, yPosition, 78, yPosition);
    yPosition += 5;
    doc.text("Su pago:", 2, yPosition);
    doc.text(paymentAmount, xPositionPayment, yPosition);
    yPosition += 5;
    doc.text("Su cambio:", 2, yPosition);
    doc.text(changeAmount, xPositionChange, yPosition);
    yPosition += 5;
    
    // Detalles de pago en efectivo
    doc.text("Efectivo", 2, yPosition);
    doc.text(cashAmount, xPositionCash, yPosition);
    yPosition += 5;
  
    // Separador
    doc.line(2, yPosition, 78, yPosition); // Línea de separación
    yPosition += 5;
  
    // Nota
    doc.text("Nota:", 2, yPosition); // Nota
    yPosition += 5;
  
    // Imprimir los textos centrados
    doc.text(termsText, xPositionTerms, yPosition); // Términos de venta
    yPosition += 5;
    doc.text(returnPolicyText, xPositionPolicy, yPosition); // Política de devoluciones
    yPosition += 5;
    doc.text(websiteText, xPositionWebsite, yPosition); // Sitio web
    
    // Imprimir el documento
    //doc.autoPrint(); // Esto abrirá el cuadro de impresión
    //doc.output("dataurlnewwindow"); // Opcional: abre el ticket en una nueva ventana
    doc.save(`${data.ticketNumber}.pdf`);
  };
  
  const printSale = () => {

    const ticketData = {
      companyName: "WWW.FIXOEM.COM",
      address: "Av. Benito Juarez 100 Centro",
      postalCode: "CP. 22000 Tijuana Baja California Norte",
      phoneNumber: "(771) 4834386",
      seller: "JOSAFAT GARCIA",
      ticketNumber: "232323",
      date: "17/17/2025 19:04",
      clientNumber: "1323242",
      clientName: "MARCOS ALBERTO",
      subtotalAmount: "$00.00",
      discountAmount: "$00.00",
      taxesAmount: "$00.00",
      totalAmount: "$00.00",
      paymentAmount: "$00.00",
      changeAmount: "$00.00",
      cashAmount: "$00.00",
      website: "WWW.FIXOEM.COM",
      products: [
        { sku: "123456", descripcion: "Pantalla iPhone 11", cantidad: 2, precioUnitario: 500, precioTotal: 2 * 500 },
        { sku: "789012", descripcion: "Batería Samsung S21", cantidad: 1, precioUnitario: 300, precioTotal: 1 * 300 },
        { sku: "345678", descripcion: "Cargador USB-C 20W", cantidad: 3, precioUnitario: 200, precioTotal: 3 * 200 }
      ]
    };

    generateTicket(ticketData);

  };

  const handleFinishPayment = () => {

    setLoading(true);
    // Guardar data en bd

    // Despues de enviar data a bd imprimir ticket
    printSale();
    // Aquí puedes agregar la lógica para finalizar el pago, como enviar los datos a una API.
    reset();

    setTimeout(() => {
      setLoading(false); // Finaliza la carga
    }, 3000);
  };

  const [loading, setLoading] = useState(false);

  if (loading) {
    return <LoadingSecondary />;
  }

  function reset() {
    setIsPaying(false);
  }

  return (
    <Container fluid style={{ height: '100%', padding: '0' }}>
      <Row style={{ height: '10%' }} >
        <CustomNavbar
          actions={
            <>
              {
                !isPaying ? 
                (
                  <Button variant="secondary" className='secondary' onClick={handleShowModal}>
                    Otro Producto
                  </Button>
                ) : 
                (
                  <Button variant="secondary" onClick={addPaymentMethod}>
                    Agregar Método de Pago
                  </Button>
                )
              }
              <Button variant="secondary" className='secondary' onClick={() => { navigate('/panel') }}>
                Cancelar
              </Button>
            </>
          }
        />
      </Row>
      { !isPaying ? (
        <Row style={{ height: '90%', padding: ' 0' }}>
          <Col md={8} className="product-section" style={{ padding: ' 10px' }}>
            {/* Pasar la función onSearch a SearchBar */}
            <SearchBar onSearch={setSearchTerm} />
            {/* Pasar los productos filtrados a ProductList */}
            <ProductList products={filteredProducts()} addToCart={addToCart} />
          </Col>
          <Col md={4} className="cart-section">
            <Cart cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} handlePayment={handlePayment} />
          </Col>
        </Row>
      ) : 
      (
        <Row style={{ height: '90%', padding: '0' }}>
          
          <Col md={6}>
            <Form>
                {paymentMethods.map((payment, index) => (
                  <Row key={index} className="mb-3">
                    <Col>
                      <Form.Group>
                        <Form.Label>Método de Pago {index + 1}</Form.Label>
                        <Form.Control
                          as="select"
                          value={payment.method}
                          onChange={(e) => handleMethodChange(index, e)}
                        >
                          <option value="">Seleccione un método</option>
                          <option value="Efectivo">Efectivo</option>
                          <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                          <option value="Transferencia">Transferencia</option>
                          <option value="Otro">Otro</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Cantidad</Form.Label>
                        <InputGroup>
                          <InputGroup.Text>$</InputGroup.Text>
                          <Form.Control
                            type="number"
                            value={payment.amount}
                            onChange={(e) => handleAmountChange(index, e)}
                            placeholder="Ingrese la cantidad"
                          />
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                ))}
              
            </Form>
          </Col>
          <Col md={6} style={{ background: "#FFF6EF", border: "2px solid #D35711"  }}>
            <div style={{ borderBottom: "2px solid #D35711", height: "30%", display: "flex", justifyContent: 'center', alignItems: 'center', flexFlow: 'column' }}>
              <span style={{ fontSize: '20px' }} > Total a pagar </span>
              <strong style={{ fontSize: '25px' }} >$ { calcTotal().toFixed(2) } </strong>
            </div>

            <div style={{ height: '70%', display: 'flex', width: '100%', flexFlow: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <span>Pago</span>
                <span>$00.00</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <span>Cambío: </span>
                <span>$00.00</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', margin: 'auto 0 0 0' }}>
                <Button
                  onClick={handleFinishPayment}
                  style={{ backgroundColor: '#D35711', border: 'none', padding: '10px 30px', width: '100%' }}
                >
                  Finalizar Pago
                </Button>
              </div>
            </div>
          </Col>

        </Row>
      ) 
      }
      

      <AddProductModal
        show={showModal}
        handleClose={handleCloseModal}
        addProductToCart={addToCart}
      />
    </Container>
  );
};

export default PointOfSale;