import { Container, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';
import UniversalTable from '../components/UniversalTable';
import CustomNavbar from '../components/CustomNavbar';
import { useState } from 'react';


const CashOut = () => {

    const cashoutColumns = [
        { key: 'folio', header: 'Folio' },
        { key: 'createdAt', header: 'Hora Apertura' },
        { key: 'closedAt', header: 'Hora Cierre' },
        { key: 'system', header: 'Sistema' },
        { key: 'user', header: 'Usuario' },
        { key: 'status', header: 'Estatus' }
    ]


    const cashoutList = [
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

  
    const [cashoutData, setCashoutData] = useState(
      {
        bySystem: {
          cash: 0.0,
          transference: 0.0,
          debit: 0.0,
          credit: 0.0,
          total: 0.0
        },
        byUser: {
          cash: 0.0,
          transference: 0.0,
          debit: 0.0,
          credit: 0.0,
          total: 0.0,
          comments: '',
        },
        diference: 0.0,
        createdAt: '', 
        status: '',
        createdBy: '',
      }
    )

    // Función para manejar cambios en los inputs
  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setCashoutData((prevState) => {
      const updatedByUser = {
        ...prevState.byUser,
        [field]: field === 'comments' ? value : parseFloat(value) || 0.0, // Convierte a número excepto para comentarios
      };

      // Calcular el total después de actualizar el campo
      const total = updatedByUser.cash + updatedByUser.transference + updatedByUser.debit + updatedByUser.credit;

      return {
        ...prevState,
        byUser: {
          ...updatedByUser,
          total: total, // Actualizar el total
        },
        diference: (total - prevState.bySystem.total)
      };
    });
  };


  // Función para manejar el envío del formulario
  const handleFinishPayment = () => {

    console.log(cashoutData);
    console.log('Datos enviados:', cashoutData);
    // Aquí puedes agregar la lógica para enviar los datos a una API

    // Despues de enviar guardar la venta en bd, hacer el ticket para imprimir

  };
    
    const [ newCashout, setNewcashout ] = useState(false);
    const handleNewcashout = () => {
      setNewcashout(!newCashout);
    } 

    return(
        <Container fluid style={{ height: '100%', padding: '0' }}>
            <Row style={{ height: '10%' }} >
              <CustomNavbar
                actions={

                  newCashout ? 
                  (
                    <Button variant="secondary" onClick={handleNewcashout}>
                      Cancelar
                    </Button>
                  )
                  :
                  (
                    <Button variant="secondary" onClick={handleNewcashout}>
                      Nuevo
                    </Button>
                  )
                }
              />
            </Row>
            <Row style={{ height: '90%', padding: '0' }}>
                <Col md={8}>

                    <UniversalTable columns={cashoutColumns} data={cashoutList} />

                </Col>
                <Col md={4} style={{ background: "#FFF6EF", border: "2px solid #D35711", padding: '0'  }} >

                  { 
                    newCashout ? 
                    (
                      <div style={{ width:'100%', display: 'flex', flexFlow: 'column', height: '100%' }}>
                        <div style={{ height: '90px', background: '#F25C05', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> 
                            <strong style={{ color: 'white' }}> ARQUEO DE VENTA </strong>
                        </div>

                        <div style={{ width:'100%', display: 'flex', flexFlow: 'column', alignItems: 'start' }}>
                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Hora de Apertura </strong> <span>{ cashoutData.createdAt }</span>
                            </div>

                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Creado por </strong> <span>{ cashoutData.createdBy }</span>
                            </div>

                            <div style={{ width: '100%', display:'flex', justifyContent: 'space-between', padding: '0 10px'}}>
                                <strong> Estatus </strong> <span>{ cashoutData.status }</span>
                            </div>
                        </div>

                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0 10px',  margin: '10px 0 0'}}>
                            <strong > SEGUN SISTEMA </strong>
                        </div>

                        <div style={{ height: '20%', display: 'flex', flexFlow: 'column', padding: '0 10px'}}>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Efectivo </span> <span>${ cashoutData.bySystem.cash }</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Transferencia </span> <span>${ cashoutData.bySystem.transference }</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Debito </span> <span>${ cashoutData.bySystem.debit }</span>
                            </div>

                            <div style={{ height: '25%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                                <span> Tarjeta Credito </span> <span>${ cashoutData.bySystem.credit }</span>
                            </div>


                        </div>


                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                            <span> Total </span> <span>${ cashoutData.bySystem.total }</span>
                        </div>

                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'start', padding: '0 10px',  margin: '10px 0 0'}}>
                            <strong > SEGUN USUARIO </strong>
                        </div>

                        
                        <div style={{ height: '25%', display: 'flex', flexFlow: 'column', padding: '0 10px' }}>
                          {/* Efectivo */}
                          <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span>Efectivo</span>
                            <InputGroup style={{ width: 'auto', alignItems: 'center' }}>
                              <InputGroup.Text style={{ height: '20%'  }} >$</InputGroup.Text>
                              <Form.Control
                                type="number"
                                placeholder="0.00"
                                style={{ width: '100px', height: '20%' }}
                                value={cashoutData.byUser.cash}
                                onChange={(e) => handleInputChange(e, 'cash')}
                              />
                            </InputGroup>
                          </div>

                          {/* Transferencia */}
                          <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span>Transferencia</span>
                            <InputGroup style={{ width: 'auto', alignItems: 'center' }}>
                              <InputGroup.Text style={{ height: '20%'  }} >$</InputGroup.Text>
                              <Form.Control
                                type="number"
                                placeholder="0.00"
                                style={{ width: '100px', height: '20%' }}
                                value={cashoutData.byUser.transference}
                                onChange={(e) => handleInputChange(e, 'transference')}
                              />
                            </InputGroup>
                          </div>

                          {/* Tarjeta Débito */}
                          <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span>Tarjeta Débito</span>
                            <InputGroup style={{ width: 'auto', alignItems: 'center'}}>
                              <InputGroup.Text style={{ height: '20%'  }}>$</InputGroup.Text>
                              <Form.Control
                                type="number"
                                placeholder="0.00"
                                style={{ width: '100px', height: '20%' }}
                                value={cashoutData.byUser.debit}
                                onChange={(e) => handleInputChange(e, 'debit')}
                              />
                            </InputGroup>
                          </div>

                          {/* Tarjeta Crédito */}
                          <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span>Tarjeta Crédito</span>
                            <InputGroup style={{ width: 'auto', alignItems: 'center' }}>
                              <InputGroup.Text style={{ height: '20%'  }} >$</InputGroup.Text>
                              <Form.Control
                                type="number"
                                placeholder="0.00"
                                style={{ width: '100px', height: '20%' }}
                                value={cashoutData.byUser.credit}
                                onChange={(e) => handleInputChange(e, 'credit')}
                              />
                            </InputGroup>
                          </div>

                          {/* Comentarios */}
                          <div style={{ height: '20%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
                            <span>Comentarios</span>
                            <Form.Control
                              as="textarea"
                              placeholder="Escribe un comentario"
                              style={{ width: '50%', height: '20%' }}
                              value={cashoutData.byUser.comments}
                              onChange={(e) => handleInputChange(e, 'comments')}
                            />
                          </div>
                        </div>


                        <div style={{ height: '5%', background: '#F2F2F2', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px'}}>
                            <span> Total </span> <span>${ cashoutData.byUser.total }</span>
                        </div>

                        <div
                          style={{
                            height: '5%',
                            background: cashoutData.diference >= 0 ? '#E7FAFA' : '#FFD8D8',
                            border: cashoutData.diference >= 0 ? '2px solid #00B374' : '2px solid #CC3333',
                            color: cashoutData.diference >= 0 ? '#00B374' : '#CC3333',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '0 10px',
                            margin: '10px 0 0',
                          }}
                        >
                          <span>Diferencia</span>
                          <span>${cashoutData.diference.toFixed(2)}</span>
                        </div>

                        

                        <div style={{ width: '100%', margin: 'auto 0 0 0', padding: '10px' }}>
                            <Button style={{ width: '100%', margin: '10px 0 0 0', background: '#F25C05', borderColor: '#F25C05' }} onClick={handleFinishPayment}> FINALIZAR ARQUEO </Button>
                        </div>
                      </div>
                    ) 
                    : 
                    (
                      <div>
                        
                      </div>
                    )
                  }
                    
                </Col>
            </Row>
        </Container>
    );

}

export default CashOut;