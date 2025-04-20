import UniversalTable from '../components/UniversalTable';
import { Container, Row, Button } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const Sales = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://78.13.0.202:8080/sales');
        setSales(response.data);
        console.log('Se obtuvo las ventas correctamente: ', response.data);
      } catch (error) {
        console.error('Hubo un error al obtener las ventas: ', error);
      }
    };

    fetchSales();
  }, []);

  const salesColumns = [
    { key: 'id', header: 'Folio' },
    { key: 'created_at', header: 'Fecha' },
    //{ key: 'sucursal', header: 'Sucursal' },
    {
      key: 'total',
      header: 'Total',
      render: (data: Sale) => `$${data.total.toFixed(2)}`,
    },
    {
      key: 'subtotal',
      header: 'Subtotal',
      render: (data: Sale) => `$${data.total.toFixed(2)}`,
    },
    //{ key: 'vendedor', header: 'Vendedor' },
    { key: 'paymentMethod', header: 'Método de Pago' },
    { key: 'updated_at', header: 'Actualizado' },
  ];

  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '10%' }}>
        <CustomNavbar
          actions={
            <>
              <Button
                variant="secondary"
                className="secondary"
                onClick={() => navigate('/puntos-venta')}
              >
                Nuevo
              </Button>
            </>
          }
        />
      </Row>
      <Row
        style={{
          height: 'calc(90% - 30px)',
          marginBlock: '10px',
          marginTop: '30px',
        }}
      >
        <UniversalTable columns={salesColumns} data={sales} />
      </Row>
    </Container>
  );
};

export default Sales;
