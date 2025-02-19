
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import UniversalTable from '../components/UniversalTable';
import { FaPrint, FaDownload, FaArrowLeft, FaArrowRight, FaReceipt, FaListAlt  } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '/reverse.png';
import '../styles/sale-detail.css';

const SaleDetail = () => {
  const { id } = useParams(); // Obtener el ID de la venta desde la URL
  const navigate = useNavigate();

  // Datos de ejemplo (reemplaza esto con una llamada a la API)
  const saleData = {
    id: 1,
    createdAt: '2023-10-01',
    importeTotal: 100.0,
    vendedor: 'Josafat',
    metodoPago: 'Debito',
    sucursal: 'MEXICO',
    productos: [
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'P0strontronstr50pxcto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      { id: 1, nombre: 'Producto A', cantidad: 2, precioUnitario: 25.0 },
      { id: 2, nombre: 'Producto B', cantidad: 1, precioUnitario: 50.0 },
      
    ],
  };

  const salesColumns = [
  { header: 'Producto', key: 'nombre' },
  { header: 'Cantidad', key: 'cantidad' },
  { header: 'Precio Unitario', key: 'precioUnitario', render: (row) => `$${row.precioUnitario.toFixed(2)}` },
  { header: 'Subtotal', render: (row) => `$${(row.cantidad * row.precioUnitario).toFixed(2)}` }
];

const prevSale = () => {
    const prevId = saleData.id - 1;
    if (prevId > 0) {
      navigate(`/ventas/${prevId}`);
    }
  };

  const nextSale = () => {
    const nextId = saleData.id + 1;
    navigate(`/ventas/${nextId}`);
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
  doc.output("dataurlnewwindow"); // Opcional: abre el ticket en una nueva ventana
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

  const downloadSale = () => {
    const saleDataStr = JSON.stringify(saleData, null, 2);
    const blob = new Blob([saleDataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `venta-${saleData.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <Container fluid style={{ height: '100%', padding: '0' }}>
      <Row style={{ height: '10%' }} >
        <CustomNavbar
          actions={
            <>
              <Button variant='secondary' onClick={printSale} style={{ cursor: 'pointer' }}>
                <FaPrint size={12} />
              </Button>
              <Button variant='secondary' onClick={downloadSale} style={{ cursor: 'pointer' }}>
                <FaDownload size={12} />
              </Button>
              <Button variant='secondary' onClick={prevSale} style={{  cursor: 'pointer' }}>
                <FaArrowLeft size={12} />
              </Button>
              <Button variant='secondary' onClick={nextSale} style={{  cursor: 'pointer' }}>
                <FaArrowRight size={12} />
              </Button>
              <Button  variant="secondary" onClick={() => navigate(-1)} className="secondary">
                Volver
              </Button>
            </>
          }
        />
      </Row>
      <Row style={{ height: '90%', padding: '15px 0' }}>
          
          <Col md={4} className='ps-5 pe-5'>
            {/* Encabezado con iconos de navegación */}
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '0 0 20px 0', gap: '50px'   }}>
              <div className='box-main-icon'>
                <FaReceipt color="#F25C05" size={24} />
              </div>
              <h2 style={{ textAlign: 'start', margin: '0' }}>{saleData.id}</h2>
            </div>
            
              

            {/* Información de la venta */}
            <div style={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Fecha:</strong> 
                <strong>{saleData.createdAt}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Vendedor:</strong> 
                <strong>{saleData.vendedor}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Método de Pago:</strong> 
                <strong>{saleData.metodoPago}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Sucursal:</strong> 
                <strong>{saleData.sucursal}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Importe total:</strong> 
                <strong>${saleData.importeTotal.toFixed(2)}</strong>
              </div>
            </div>

        
          </Col>

          <Col md={8}>
            <div style={{ display: 'flex', alignItems: 'center', margin: 'auto', gap: '50px', width: '85%'  }}>
              <div className='box-main-icon'>
                <FaListAlt  color="#F25C05" size={24} />
              </div>
              <h2 style={{ textAlign: 'start'}} >Detalles</h2>
            </div>
            <UniversalTable columns={salesColumns} data={saleData.productos} />;
          </Col>
      </Row>
    </Container>
  );
};

export default SaleDetail;