import CustomNavbar from '../components/CustomNavbar';
import { Container, Row } from 'react-bootstrap';
import CardPOS from '../components/CardPOS';

const PointOfSales = () => {
  return (
    <Container fluid style={{ height: '100%' }}>
      <Row style={{ height: '10%' }}>
        <CustomNavbar actions={<></>} />
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
          <CardPOS
            POSName={'CEDIS'}
            POSId={1}
            POSStatusIsOpen={true}
            POSUserResponsable={'Josafat García'}
          />
        </div>
      </Row>
    </Container>
  );
};

export default PointOfSales;
