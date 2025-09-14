import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import UniversalTable from '../components/UniversalTable';
import axios from 'axios';

import Product from '../interfaces/product.interface';

function Products() {

  const [products, setProducts] = useState<Product[]>([]);

  const productsColumns = [
    { header: 'Id', key: 'id' },
    { header: 'Codigo Barras', key: 'barcode' },
    { header: 'Descripción', key: 'description' },
    { header: 'Unidad', key: 'unit_measurement' },
    { header: 'Categoría', key: 'category_id'  },
    { header: 'Creado',  key: 'created_at' },
    { header: 'Actualizado', key: 'updated_at' },
  ]

  useEffect(() => {

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/products');
            setProducts(response.data)
            console.log('Se obtuvo los productos correctamente');
        } catch (error) {
            console.error('Hubo un error al obtener las ventas: ', error)
        }
    }

    getProducts()

  }, []);

  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '10%' }}>
        <CustomNavbar actions={<></>} />
      </Row>
      <Row
        style={{
          height: 'calc(80% - 40px)',
          marginBlock: '10px',
          marginTop: '30px',
        }}
      >
        <UniversalTable columns={productsColumns} data={products} />
      </Row>
    </Container>
  );
}

export default Products;
