
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import UniversalTable from '../components/UniversalTable';
import { FaPrint, FaDownload, FaArrowLeft, FaArrowRight, FaReceipt, FaListAlt  } from 'react-icons/fa';
import jsPDF from 'jspdf';
import logo from '/reverse.png';
import '../styles/sale-detail.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Sale {
  id: number; // SERIAL PRIMARY KEY
  company_id: number; // INTEGER REFERENCES companies(id) ON DELETE CASCADE
  shift_id: number | null; // INTEGER REFERENCES shifts(id) ON DELETE SET NULL
  payment_method: string | null; // VARCHAR(50)
  subtotal: number; // FLOAT
  total: number; // FLOAT
  comment: string | null; // TEXT
  created_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  is_active: boolean; // BOOLEAN DEFAULT TRUE
}

interface SaleHasProduct {
  id: number; // SERIAL PRIMARY KEY
  product_id: number; // INTEGER REFERENCES products(id) ON DELETE CASCADE
  sale_id: number; // INTEGER REFERENCES sales(id) ON DELETE CASCADE
  sale_price: number; // FLOAT
  purchase_price: number; // FLOAT
  quantity: number;
  created_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  is_active: boolean; // BOOLEAN DEFAULT TRUE
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
  products: ItemCart[];
}

interface ItemCart extends Product, SaleHasProduct {}

const SaleDetail = () => {
  const { id } = useParams(); // Obtener el ID de la venta desde la URL
  const navigate = useNavigate();
  const [sale, setSale] = useState<Sale | null>({
    id: 0,
    company_id: 0,
    shift_id: 0,
    payment_method: "",
    subtotal: 0,
    total: 0,
    comment: "",
    created_at: new Date(),
    updated_at: new Date(),
    is_active: true,
  });

  const [saleProducts, setSaleProducts] = useState<SaleHasProduct[]>([])
  const [saleCart, setSaleCart] = useState<ItemCart[]>([]);

  useEffect(() => {
      
    const fetchSales = async() => {
      try {
        const response = await axios.get(`http://78.13.0.202:8080/sales/${id}`);
        setSale(response.data);
        console.log("Se obtuvo las venta correctamente: ", response.data);
      } catch (error) {
        console.error("Hubo un error al obtener las ventas: ", error)
      }
    }

    const fetchSaleProducts = async() => {
      try {
        const response = await axios.get(`http://78.13.0.202:8080/sales/${id}/products`);
        setSaleProducts(response.data);
        console.log("Se obtuvo los productos de la venta correctamente: ", response.data);
      } catch (error) {
        console.error("No se obtuvo los prodcutos de venta la correctamente: ", error)
      }
    }

    fetchSales();
    fetchSaleProducts();

  }, [])

  useEffect(() => {

    const fetchProduct = async(product_id: number) => {
      try {
        const response = await axios.get(`http://78.13.0.202:8080/products/${product_id}`);
        console.log("Se obtuvo el producto correctamente: ", response.data);

        return response.data;
      } catch (error) {
        console.error("No se obtuvo el producto correctamente: ", error)
        return null;
      }
    }

    
    const fetchAllProducts = async () => {
      const updatedProducts = await Promise.all(
        saleProducts.map(async (item) => {
          const product = await fetchProduct(item.product_id);
          return { ...item, ...product };
        })
      );
  
      setSaleCart(updatedProducts);
    };

    fetchAllProducts();


  }, [sale, saleProducts])

  


  const saleProductsColumns = [
  { header: 'Producto', key: 'description' },
  { header: 'Cantidad', key: 'quantity' },
  { header: 'Precio Unitario', key: 'sale_price', render: (row: ItemCart) => `$${row.sale_price.toFixed(2)}` },
  { header: 'Subtotal', key: 'sale_subtotal', render: (row: ItemCart) => `$${(row.quantity * row.sale_price).toFixed(2)}` }
];

const prevSale = () => {
const prevId = sale && sale.id ? sale.id - 1 : 0;
  if (prevId > 0) {
    navigate(`/ventas/${prevId}`);
  }
};

const nextSale = () => {
  const nextId = (sale?.id ?? 0) + 1;
  navigate(`/ventas/${nextId}`);
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
      const skuText = `${cartItem.id}`;
      const descriptionText = ` ${cartItem.description}`;

      // Mostrar cantidad y guion
      doc.text(productText, 2, yPosition);

      // SKU en negritas
      doc.setFont("helvetica", "bold");
      doc.text(skuText, doc.getTextWidth(productText) + 2, yPosition);

      // Volver a fuente normal y mostrar la descripción
      doc.setFont("helvetica", "normal");
      doc.text(descriptionText, doc.getTextWidth(productText + skuText) + 4, yPosition);

      // Mostrar precio alineado a la derecha
      const totalProduct = `${cartItem.sale_price.toFixed(2)}`;
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
    if (!saleProducts || saleProducts.length === 0) {
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
      paymentAmount: `$00.00`,
      changeAmount: `$00.00`,
      cashAmount: `${data.total}`,
      website: "WWW.FIXOEM.COM", //moddify
      products: saleCart,
    };
  
    console.log(ticketData);
    generateTicket(ticketData);

  };

  const downloadSale = () => {
    const saleDataStr = JSON.stringify(sale, null, 2);
    const blob = new Blob([saleDataStr], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `venta-${id}.json`;
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
              <Button variant='secondary' onClick={() => { if (sale) printSale(sale) }} style={{ cursor: 'pointer' }}>
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
              <h2 style={{ textAlign: 'start', margin: '0' }}># {id}</h2>
            </div>
            
              

            {/* Información de la venta */}
            <div style={{ display: 'grid', width: '100%', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Fecha:</strong> 
                <strong>{sale?.created_at.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Vendedor:</strong> 
                <strong>{}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Método de Pago:</strong> 
                <strong>{sale?.payment_method}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Sucursal:</strong> 
                <strong>{}</strong>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column', textAlign: 'start' }}>
                <strong style={{ color: "#666", fontSize: '14px' }}>Importe total:</strong> 
                <strong>${sale?.total.toFixed(2)}</strong>
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
            <UniversalTable columns={saleProductsColumns} data={saleCart} />;
          </Col>
      </Row>
    </Container>
  );
};

export default SaleDetail;