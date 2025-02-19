import UniversalTable from '../components/UniversalTable';
import { Container, Row } from 'react-bootstrap'
import CustomNavbar from '../components/CustomNavbar'; 

export default function Inventory(){

    const inventoryColumns = [
        { key: 'folio', header: 'Folio' },
        { key: 'quantity', header: 'Cantidad' },
        { key: 'priceSale', header: 'Price Venta' },
        { key: 'batchName', header: 'Lote' },
        { key: 'batchId', header: 'Lote ID' },
        { key: 'productId', header: 'productId' },
        { key: 'pricePurchase', header: 'Precio Compra' },
        { key: 'createdBy', header: 'Agregado Por' },
        { key: 'createdAt', header: 'Fecha creación' },
        { key: 'updatedAt', header: 'Fecha actualización' },
        { key: 'updatedBy', header: 'Actualizado por' }
    ]

    const inventoryData = [
        {
          folio: 101,
          quantity: 50,
          priceSale: 25.99,
          batchName: 'Lote A',
          batchId: 'BATCH001',
          productId: 'PROD001',
          pricePurchase: 15.50,
          createdBy: 'Josafat',
          createdAt: '2023-10-01',
          updatedAt: '2023-10-05',
          updatedBy: 'Ana',
        },
        {
          folio: 102,
          quantity: 30,
          priceSale: 19.99,
          batchName: 'Lote B',
          batchId: 'BATCH002',
          productId: 'PROD002',
          pricePurchase: 10.00,
          createdBy: 'Carlos',
          createdAt: '2023-10-02',
          updatedAt: '2023-10-06',
          updatedBy: 'Josafat',
        },
        {
          folio: 103,
          quantity: 100,
          priceSale: 49.99,
          batchName: 'Lote C',
          batchId: 'BATCH003',
          productId: 'PROD003',
          pricePurchase: 30.00,
          createdBy: 'Ana',
          createdAt: '2023-10-03',
          updatedAt: '2023-10-07',
          updatedBy: 'Carlos',
        },
        {
          folio: 104,
          quantity: 20,
          priceSale: 15.99,
          batchName: 'Lote D',
          batchId: 'BATCH004',
          productId: 'PROD004',
          pricePurchase: 8.00,
          createdBy: 'Josafat',
          createdAt: '2023-10-04',
          updatedAt: '2023-10-08',
          updatedBy: 'Ana',
        },
        {
          folio: 105,
          quantity: 75,
          priceSale: 29.99,
          batchName: 'Lote E',
          batchId: 'BATCH005',
          productId: 'PROD005',
          pricePurchase: 18.00,
          createdBy: 'Carlos',
          createdAt: '2023-10-05',
          updatedAt: '2023-10-09',
          updatedBy: 'Josafat',
        },
      ];

    return(
      <Container fluid style={{ height: '100%', padding: '0' }}>
        <Row style={{ height: '10%' }} >
          <CustomNavbar></CustomNavbar>
        </Row>

        <Row style={{ height: '90%' }} >
          <UniversalTable columns={inventoryColumns} data={inventoryData} />
        </Row>
      </Container>
    );
}