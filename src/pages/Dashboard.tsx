import { Container, Row } from 'react-bootstrap'
import CustomNavbar from '../components/CustomNavbar'; 

export default function Dashboard(){
    return(
        <Container fluid style={{ height: '100%', padding: '0' }}>
            <Row style={{ height: '10%' }} >
                <CustomNavbar actions={
                    <>
                    
                    </>
                } />
            </Row>

            <Row style={{ height: '90%' }} >
                
            </Row>
        </Container>
    );
}