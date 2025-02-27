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

// Definición de tipos
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

interface Sale {
  id: number;
  company_id: number;
  shift_id?: number | null;  // Puede ser null
  payment_method: string;
  subtotal: number;
  total: number;
  comment?: string | null;   // Puede ser null
  created_at: string;        // ISO string (Ej: "2024-02-24T12:34:56Z")
  updated_at: string;
  is_active: boolean;
}


interface CartItem {
  product: Product,
  inventory: Inventory,
  quantity: number
}

interface PaymentMethod {
  method: string;
  amount: string;
}

interface TicketData {
  companyName: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  seller: string;
  ticketNumber: string;
  date: string;
  clientNumber: string;
  clientName: string;
  subtotalAmount: string;
  discountAmount: string;
  taxesAmount: string;
  totalAmount: string;
  paymentAmount: string;
  changeAmount: string;
  cashAmount: string;
  website: string;
  products: CartItem[];
}

const PointOfSale = () => {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [products, setProducts] = useState<Product[]>([]);
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { method: '', amount: '' },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

    // Obtener productos desde la API
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`http://78.13.0.202:8080/products`);
          if (response.data == null) {
            setProducts([]);
          } else {
            setProducts(response.data);
          }

        } catch (error) {
          console.error("Error obteniendo los productos:", error);
          setProducts([]);
        }
      };
  
      fetchProducts();
    }, []);


  
    // Filtrar productos según el término de búsqueda
    const filteredProducts = () => {
      if (searchTerm === '') return [];
      return products.filter((product) =>
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
  
    // Agregar producto al carrito
    const addToCart = (cartItem: CartItem) => {
      const productIndex = cart.findIndex((item) => item.product.id === cartItem.product.id);
      if (productIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...cartItem, quantity: 1 }]);
      }
    };
  
    // Aumentar cantidad de un producto en el carrito
    const increaseQuantity = (productId: number) => {
      const updatedCart = cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    };
  
    // Disminuir cantidad de un producto en el carrito
    const decreaseQuantity = (productId: number) => {
      const updatedCart = cart
        .map((item) => {
          if (item.product.id === productId) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
      setCart(updatedCart);
    };
  
    // Eliminar producto del carrito
    const removeFromCart = (index: number) => {
      const newCart = cart.filter((_, i) => i !== index);
      setCart(newCart);
    };
  
    // Calcular el total del carrito
    const calcTotal = () => {
      return cart.reduce((sum, item) => sum + item.inventory.price_sale * item.quantity, 0);
    };

    const [yourPayment, setYourPayment] = useState(0);
    const [yourChange, setYourChange] = useState(0);

    const handlePaymentChange = () => {
      // Calcular el total del pago
      const totalPayment = paymentMethods.reduce((sum, payment) => {
        return sum + (parseFloat(payment.amount) || 0);
      }, 0);

      // Calcular el cambio
      const exchange = totalPayment - calcTotal();

      // Actualizar los estados
      setYourPayment(totalPayment);
      setYourChange(exchange);
    }
  
    // Cambiar método de pago
    const handleMethodChange = (index: number, e: React.ChangeEvent<any>) => {
          const newPaymentMethods = [...paymentMethods];
          newPaymentMethods[index].method = e.target.value;
          setPaymentMethods(newPaymentMethods);
        };
  
    // Cambiar cantidad de pago
    const handleAmountChange = (index: number, e: React.ChangeEvent<any>) => {
      const newPaymentMethods = [...paymentMethods];
      newPaymentMethods[index].amount = e.target.value;
      setPaymentMethods(newPaymentMethods);
    };
  
    // Agregar método de pago
    const addPaymentMethod = () => {
      setPaymentMethods([...paymentMethods, { method: '', amount: '' }]);
    };

    useEffect(() => {
      handlePaymentChange();
    }, [paymentMethods]);
  
    // Finalizar pago
    const handleFinishPayment = async () => {
      setLoading(true);
      try {
        saveData();
      } catch (error) {
        console.error("Error al finalizar el pago:", error);
      } finally {
        setLoading(false);
      }
    };
  
    // Reiniciar estado
    const reset = () => {
      setIsPaying(false);
      setCart([]);
      setPaymentMethods([{ method: '', amount: '' }]);
    };

    const saveData = async () => {
      try {
        const companyId = localStorage.getItem("user_company_id");
        const parsedCompanyId = companyId ? parseFloat(JSON.parse(companyId)) : null;
    
        if (!parsedCompanyId) {
          console.error("Invalid company_id");
          return;
        }
    
        const salePayload = {
          company_id: parsedCompanyId,
          shift_id: 1,
          payment_method: "debit",
          subtotal: calcTotal(),
          total: calcTotal(),
          comment: "",
          is_active: true,
        };
    
        const saleResponse = await axios.post("http://78.13.0.202:8080/sales", salePayload);
        const sale = saleResponse.data;
    

        console.log("Venta registrada: ", sale)
    
        if (cart.length === 0) {
          console.warn("El carrito está vacío. No se guardarán productos.");
          return;
        }
    
        const productRequests = cart.map(async (item) => {
          const productPayload = {
            product_id: item.product.id,
            sale_id: sale.id,
            sale_price: item.inventory.price_sale,
            purchase_price: item.inventory.price_purchase,
            quantity: item.quantity,
            is_active: true,
          };
    
          return axios.post("http://78.13.0.202:8080/sale-products", productPayload);
        });
    
        const productResponses = await Promise.all(productRequests);
        const savedProducts = productResponses.map((response) => response.data);
    
        console.log("Productos guardados exitosamente:", savedProducts);
        printSale(sale);
      } catch (error) {
        console.error("Error al guardar la venta o los productos:", error);
      }
    };
    
  
  const handlePayment = () => {
    setIsPaying(!isPaying);
  };


  // Función para calcular la posición X para justificar a la derecha
  const getRightAlignX = (doc: jsPDF, text: string, marginRight = 2, pageWidth = 80) => {
    const textWidth = doc.getTextWidth(text); // Medir el ancho del texto
    return pageWidth - textWidth - marginRight; // Posición X para alinear a la derecha
  };

  // Función para calcular la posición X para centrar el texto
  const getCenterAlignX = (doc: jsPDF, text: string, pageWidth = 80) => {
    const textWidth = doc.getTextWidth(text); // Medir el ancho del texto
    return (pageWidth - textWidth) / 2; // Posición X para centrar el texto
  };

  const generateTicket = (data: TicketData) => {
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
    data.products.forEach((cartItem) => {
      const productText = `${cartItem.quantity.toFixed(2)}` + " - ";
      const skuText = `${cartItem.product.id}`;
      const descriptionText = ` ${cartItem.product.description}`;
  
      // Mostrar cantidad y guion
      doc.text(productText, 2, yPosition);
  
      // SKU en negritas
      doc.setFont("helvetica", "bold");
      doc.text(skuText, doc.getTextWidth(productText) + 2, yPosition);
  
      // Volver a fuente normal y mostrar la descripción
      doc.setFont("helvetica", "normal");
      doc.text(descriptionText, doc.getTextWidth(productText + skuText) + 4, yPosition);
  
      // Mostrar precio alineado a la derecha
      const totalProduct = `${cartItem.inventory.price_sale.toFixed(2)}`;
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
  
  const printSale = (data: Sale) => {
    if (!data || cart.length === 0) {
      console.error("No hay datos de venta o carrito para imprimir.");
      return;
    }
  
    const company_name = JSON.parse(localStorage.getItem("user_company_name") || '""');
    const user = (JSON.parse(localStorage.getItem("user_name") || "")) + " " +
      (JSON.parse(localStorage.getItem("user_lastname") || ""));
  
    const ticketData = {
      companyName: company_name,
      address: "Av. Benito Juarez 100 Centro",
      postalCode: "CP. 22000 Tijuana Baja California Norte",
      phoneNumber: "(771) 4834386",
      seller: user,
      ticketNumber: `${data.id}`,
      date: `${data.created_at}`,
      clientNumber: "", // pending
      clientName: "", // pending
      subtotalAmount: `${data.subtotal}`,
      discountAmount: "$00.00",
      taxesAmount: "$00.00",
      totalAmount: `${data.total}`,
      paymentAmount: `${yourPayment}`,
      changeAmount: `${yourChange}`,
      cashAmount: `${data.total}`,
      website: "WWW.FIXOEM.COM", //moddify
      products: cart,
    };
  
    console.log(ticketData);
    generateTicket(ticketData);
    reset();
  };


  if (loading) {
    return <LoadingSecondary />;
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
                  <>

                    <Button variant="secondary" className='secondary' onClick={handleShowModal}>
                      Otro Producto
                    </Button>
                    <Button variant="secondary" className='secondary' onClick={() => { navigate('/panel') }}>
                      Cancelar
                    </Button>
                  </>
                ) : 
                (
                  <>
                    <Button variant="secondary" onClick={addPaymentMethod}>
                      Agregar Método de Pago
                    </Button>
                    <Button variant="secondary" className='secondary' onClick={() => { handlePayment() }}>
                      Volver
                    </Button>
                  </>
                )
              }
              
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
                <span>${yourPayment.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                <span>Cambío: </span>
                <span>${ yourChange.toFixed(2) }</span>
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