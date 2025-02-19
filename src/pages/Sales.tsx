import UniversalTable from '../components/UniversalTable';
import { Container, Row, Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import { useNavigate } from 'react-router-dom';

const Sales = () => {

  const navigate = useNavigate();
    
    const salesData = [
        {
          folio: 1,
          createdAt: '2023-10-01',
          importeTotal: 100.0,
          vendedor: 'Josafat',
          metodoPago: 'Debito',
          sucursal: 'MEXICO',
        },
        {
          folio: 2,
          createdAt: '2023-10-02',
          importeTotal: 150.0,
          vendedor: 'Ana',
          metodoPago: 'Efectivo',
          sucursal: 'GUADALAJARA',
        },
        {
          folio: 3,
          createdAt: '2023-10-03',
          importeTotal: 200.0,
          vendedor: 'Carlos',
          metodoPago: 'Crédito',
          sucursal: 'MONTERREY',
        },
        {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
          {
            folio: 1,
            createdAt: '2023-10-01',
            importeTotal: 100.0,
            vendedor: 'Josafat',
            metodoPago: 'Debito',
            sucursal: 'MEXICO',
          },
          {
            folio: 2,
            createdAt: '2023-10-02',
            importeTotal: 150.0,
            vendedor: 'Ana',
            metodoPago: 'Efectivo',
            sucursal: 'GUADALAJARA',
          },
          {
            folio: 3,
            createdAt: '2023-10-03',
            importeTotal: 200.0,
            vendedor: 'Carlos',
            metodoPago: 'Crédito',
            sucursal: 'MONTERREY',
          },
      ];
  
      const salesColumns = [
        { key: 'folio', header: 'Folio' },
        { key: 'createdAt', header: 'Fecha' },
        { key: 'sucursal', header: 'Sucursal' },
        {
          key: 'importeTotal',
          header: 'Total',
          render: (data) => `$${data.importeTotal.toFixed(2)}`,
        },
        { key: 'vendedor', header: 'Vendedor' },
        { key: 'metodoPago', header: 'Método de Pago' }
      ];

    
  
    return (
      <Container fluid style={{ height: '100%', padding: '0' }}>
        <Row style={{ height: '10%' }} >
          <CustomNavbar
            actions={
              <> 
                <Button variant="secondary" className='secondary' onClick={ () => navigate('/punto-venta')}>
                  Nuevo
                </Button>
              </>
            }
          />
        </Row>
        <Row style={{ height: '90%' }} >
          <UniversalTable columns={salesColumns} data={salesData} />
        </Row>
      </Container>
    );
  };
  
  export default Sales;