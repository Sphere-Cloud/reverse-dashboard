import { useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';

const Loading = () => {
  // Cambia el color de fondo del body cuando el componente se monta
  useEffect(() => {
    document.body.style.background = '#0741DD'; // Cambia el color de fondo del body

    // Restaura el color de fondo original cuando el componente se desmonta
    return () => {
      document.body.style.background = ''; // Restaura el color de fondo original
    };
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh', width: '100vw', margin: '0', color: 'white' }} // Ocupa toda la altura y anchura de la pantalla
    >
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Cargando...</span>
      </Spinner>
      <h3 className="ms-3">Cargando...</h3>
    </Container>
  );
};

export default Loading;