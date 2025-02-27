import CustomNavbar from "../components/CustomNavbar";
import { Container, Row } from "react-bootstrap";
import CardPOS from "../components/CardPOS";


const PointOfSales = () => {

    return(
        <Container fluid style={{ padding: '0', height: '100%' }}>
            <Row style={{ height: '10%' }}>
                <CustomNavbar actions={<></>} />
            </Row>
            <Row style={{ height: '90%' }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', padding: '10px', width: '90' }} >
                    <CardPOS POSName="EJEMPLO" POSId={1} />
                </div>

            </Row>

        </Container>
    );

}


export default PointOfSales;