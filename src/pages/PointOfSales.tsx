import CustomNavbar from '../components/CustomNavbar';
import { Container, Row, Button } from 'react-bootstrap';
import CardPOS from '../components/CardPOS';
import AddPointOfSale from '../components/AddPointOfSale';

import { useState } from 'react';

interface PointOfSale {
  POSName: string;
  POSId: number;
  POSStatusIsOpen: boolean;
  POSUserResponsable: string;
}

const PointOfSales = () => {

  const [ pointsOfSales, setPointsOfSales ] = useState<PointOfSale[]>([]);
  const [showAddPointOfSale, setShowAddPointOfSale] = useState(false);

  const handleAddPointOfSale = (newPointOfSale: PointOfSale) => {
    setPointsOfSales([...pointsOfSales, newPointOfSale]);
  };

  const handleDeletePointOfSale = (id: number) => {
    setPointsOfSales(pointsOfSales.filter(point => point.POSId !== id));
  };

  const handleOpenNewPointOfSale = () => {
    setShowAddPointOfSale(true);
  }

  const handleCloseNewPointOfSale = () => {
    setShowAddPointOfSale(false);
  }


  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '10%' }}>
        <CustomNavbar 
          actions={
            <>
              <Button
                variant="secondary"
                onClick={handleOpenNewPointOfSale}
              >
                Nuevo
              </Button>
            </>
          } 
        />
      </Row>
      <Row style={{ height: '90%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
            padding: '10px',
            width: '90',
          }}
        >
          { pointsOfSales.map((pointOfSale) => {
            return(
              <CardPOS
                POSName={pointOfSale.POSName}
                POSId={pointOfSale.POSId}
                POSStatusIsOpen={pointOfSale.POSStatusIsOpen}
                POSUserResponsable={pointOfSale.POSUserResponsable}
              />
            );
          })}
        </div>
      </Row>

      <AddPointOfSale
        show={showAddPointOfSale}
        AddPointOfSale={handleAddPointOfSale}
        onClose={handleCloseNewPointOfSale}
      />
    </Container>
  );
};

export default PointOfSales;
