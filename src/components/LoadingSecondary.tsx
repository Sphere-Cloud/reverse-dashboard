import { useEffect } from 'react';
import { Spinner, Container } from 'react-bootstrap';

const LoadingSecondary = () => {
  // Cambia el estilo del body cuando el componente se monta
  useEffect(() => {
    // Añade un fondo semitransparente con blur al body
    document.body.style.backdropFilter = 'blur(5px)';
    document.body.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; // Fondo semitransparente

    // Bloquea el scroll del body
    document.body.style.overflow = 'hidden';

    // Restaura los estilos originales cuando el componente se desmonta
    return () => {
      document.body.style.backdropFilter = '';
      document.body.style.backgroundColor = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        position: 'fixed', // Fija el componente en la pantalla
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fondo semitransparente
        backdropFilter: 'blur(5px)', // Efecto de desenfoque
        zIndex: 9999, // Asegura que esté por encima de todo
        pointerEvents: 'none', // Bloquea los eventos del mouse
      }}
    >
      <div style={{ pointerEvents: 'auto' }}> {/* Permite interacción con el spinner y el texto */}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <h3 className="ms-3">Cargando...</h3>
      </div>
    </Container>
  );
};

export default LoadingSecondary;