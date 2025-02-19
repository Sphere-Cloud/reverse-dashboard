import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import UniversalTable from '../components/UniversalTable';
import CustomNavbar from '../components/CustomNavbar';


const CashOut = () => {

    const cashoutColumns = [
        { key: 'folio', header: 'Folio' },
        { key: 'createdAt', header: 'Hora Apertura' },
        { key: 'closedAt', header: 'Hora Cierre' },
        { key: 'system', header: 'Sistema' },
        { key: 'user', header: 'Usuario' },
        { key: 'status', haeder: 'Estatus' }
    ]


    const cashoutData = [
        {
          folio: 1001,
          createdAt: '2023-10-01 08:00:00',
          closedAt: '2023-10-01 18:00:00',
          system: 'Sistema A',
          user: 'Usuario1',
          status: 'Cerrado',
        },
        {
          folio: 1002,
          createdAt: '2023-10-02 09:15:00',
          closedAt: '2023-10-02 17:45:00',
          system: 'Sistema B',
          user: 'Usuario2',
          status: 'Cerrado',
        },
        {
          folio: 1003,
          createdAt: '2023-10-03 10:00:00',
          closedAt: null, // Aún no se ha cerrado
          system: 'Sistema C',
          user: 'Usuario3',
          status: 'Abierto',
        },
        {
          folio: 1004,
          createdAt: '2023-10-04 07:30:00',
          closedAt: '2023-10-04 16:30:00',
          system: 'Sistema A',
          user: 'Usuario1',
          status: 'Cerrado',
        },
        {
          folio: 1005,
          createdAt: '2023-10-05 08:45:00',
          closedAt: null, // Aún no se ha cerrado
          system: 'Sistema B',
          user: 'Usuario4',
          status: 'Abierto',
        },
        {
          folio: 1006,
          createdAt: '2023-10-06 09:00:00',
          closedAt: '2023-10-06 19:00:00',
          system: 'Sistema C',
          user: 'Usuario2',
          status: 'Cerrado',
        },
        {
            folio: 1004,
            createdAt: '2023-10-04 07:30:00',
            closedAt: '2023-10-04 16:30:00',
            system: 'Sistema A',
            user: 'Usuario1',
            status: 'Cerrado',
          },
          {
            folio: 1005,
            createdAt: '2023-10-05 08:45:00',
            closedAt: null, // Aún no se ha cerrado
            system: 'Sistema B',
            user: 'Usuario4',
            status: 'Abierto',
          },
          {
            folio: 1006,
            createdAt: '2023-10-06 09:00:00',
            closedAt: '2023-10-06 19:00:00',
            system: 'Sistema C',
            user: 'Usuario2',
            status: 'Cerrado',
          },
          {
            folio: 1004,
            createdAt: '2023-10-04 07:30:00',
            closedAt: '2023-10-04 16:30:00',
            system: 'Sistema A',
            user: 'Usuario1',
            status: 'Cerrado',
          },
          {
            folio: 1005,
            createdAt: '2023-10-05 08:45:00',
            closedAt: null, // Aún no se ha cerrado
            system: 'Sistema B',
            user: 'Usuario4',
            status: 'Abierto',
          },
          {
            folio: 1006,
            createdAt: '2023-10-06 09:00:00',
            closedAt: '2023-10-06 19:00:00',
            system: 'Sistema C',
            user: 'Usuario2',
            status: 'Cerrado',
          },
          {
            folio: 1004,
            createdAt: '2023-10-04 07:30:00',
            closedAt: '2023-10-04 16:30:00',
            system: 'Sistema A',
            user: 'Usuario1',
            status: 'Cerrado',
          },
          {
            folio: 1005,
            createdAt: '2023-10-05 08:45:00',
            closedAt: null, // Aún no se ha cerrado
            system: 'Sistema B',
            user: 'Usuario4',
            status: 'Abierto',
          },
          {
            folio: 1006,
            createdAt: '2023-10-06 09:00:00',
            closedAt: '2023-10-06 19:00:00',
            system: 'Sistema C',
            user: 'Usuario2',
            status: 'Cerrado',
          },
          {
            folio: 1004,
            createdAt: '2023-10-04 07:30:00',
            closedAt: '2023-10-04 16:30:00',
            system: 'Sistema A',
            user: 'Usuario1',
            status: 'Cerrado',
          },
          {
            folio: 1005,
            createdAt: '2023-10-05 08:45:00',
            closedAt: null, // Aún no se ha cerrado
            system: 'Sistema B',
            user: 'Usuario4',
            status: 'Abierto',
          },
          {
            folio: 1006,
            createdAt: '2023-10-06 09:00:00',
            closedAt: '2023-10-06 19:00:00',
            system: 'Sistema C',
            user: 'Usuario2',
            status: 'Cerrado',
          },
          {
            folio: 1004,
            createdAt: '2023-10-04 07:30:00',
            closedAt: '2023-10-04 16:30:00',
            system: 'Sistema A',
            user: 'Usuario1',
            status: 'Cerrado',
          },
          {
            folio: 1005,
            createdAt: '2023-10-05 08:45:00',
            closedAt: null, // Aún no se ha cerrado
            system: 'Sistema B',
            user: 'Usuario4',
            status: 'Abierto',
          },
          {
            folio: 1006,
            createdAt: '2023-10-06 09:00:00',
            closedAt: '2023-10-06 19:00:00',
            system: 'Sistema C',
            user: 'Usuario2',
            status: 'Cerrado',
          }
      ];


    return(
        <Container fluid style={{ height: '100%', padding: '0' }}>
            <Row style={{ height: '10%' }} >
              <CustomNavbar
                actions={
                  <>
                    <Button variant="secondary" onClick={() => {}}>
                      Nuevo
                    </Button>
                  </>
                }
              />
            </Row>
            <Row style={{ height: '90%' }}>
                <Col md={8}>

                    <UniversalTable columns={cashoutColumns} data={cashoutData} />

                </Col>
                <Col md={4} style={{ height: '100%' }}>
                    <div style={{ width:'100%', display: 'flex', flexFlow: 'column', height: '100%' }}>
                        <div style={{ height: '90px', background: '#F25C05', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                            <strong style={{ color: 'white' }}> ARQUEO DE VENTA </strong>
                        </div>

                        <div style={{ width:'100%', display: 'flex', flexFlow: 'column', alignItems: 'start' }}>
                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Hora de Apertura </strong> 2025-10-10
                            </div>

                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Creado por </strong> Josafat
                            </div>

                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Estatus </strong> Abierto 
                            </div>
                        </div>

                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0 10px',  margin: '10px 0 0'}}>
                            <strong > SEGUN SISTEMA </strong>
                        </div>

                        <div style={{ height: '20%', display: 'flex', flexFlow: 'column', padding: '0 10px'}}>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Efectivo </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Transferencia </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Debito </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Credito </span> <span>$00.00</span>
                            </div>


                        </div>


                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                            <span> Total </span> <span>$00.00</span>
                        </div>

                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0 10px',  margin: '10px 0 0'}}>
                            <strong > SEGUN USUARIO </strong>
                        </div>

                        
                        <div style={{ height: '20%', display: 'flex', flexFlow: 'column', padding: '0 10px'}}>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Efectivo </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Transferencia </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Debito </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Credito </span> <span>$00.00</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Comentarios </span> <span></span>
                            </div>


                        </div>


                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                            <span> Total </span> <span>$00.00</span>
                        </div>

                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', margin: '10px 0 0'}}>
                            <span> Diferencia </span> <span>$00.00</span>
                        </div>

                        

                        <div style={{ width: '100%', margin: 'auto 0 0 0' }}>
                            <Button style={{ width: '100%', margin: '10px 0 0 0', background: '#F25C05', borderColor: '#F25C05' }}> FINALIZAR ARQUEO </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );

}

export default CashOut;