import { useState, useEffect } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaUserCircle, FaExpand, FaBars } from 'react-icons/fa'; // Íconos de FontAwesome
import Sidebar from './Sidebar';

import '../styles/custom-navbar.css';

const toTitleCase = (str) => {
  return str
    .replace(/%7D/g, '}') // Reemplaza %7D por }
    .replace(/%7B/g, '{') // Reemplaza %7B por {
    .replace(/-/g, ' ') // Reemplaza guiones por espacios
    .split(' ') // Divide en palabras
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
    .join(' '); // Une las palabras con espacios
};

const CustomNavbar = ({ username = 'Josafat', userRole = 'Programador', actions}) => {
  // Función para abrir el Sidebar
  const [showSidebar, setShowSidebar] = useState(false);

  // Función para abrir el Sidebar
  const handleShowSidebar = () => setShowSidebar(true);

  // Función para cerrar el Sidebar
  const handleCloseSidebar = () => setShowSidebar(false);

  const currentPath = toTitleCase(decodeURIComponent(location.pathname.replace(/^\/|\/$/g, '')));
  const firstSegment = currentPath.split('/')[0];

  // Función para activar el modo pantalla completa
  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen(); // Salir de pantalla completa
    } else {
      document.documentElement.requestFullscreen(); // Entrar en pantalla completa
    }
  };

  return (
    <>
      <Navbar expand="lg" bg="light" variant="light" className="shadow-sm" style={{ height: '50%' }}>
        <Container fluid>
          {/* Botón de hamburguesa para abrir el Sidebar */}
          <Button
            variant="outline-primary"
            onClick={handleShowSidebar}
            className="me-3 custom-hover-btn"
            style={{ color: '#F25C05', borderColor: '#F25C05' }}
          >
            <FaBars /> {/* Ícono de hamburguesa */}
          </Button>

          {/* Brand (Título de la página basado en la ruta) */}
          <h4 className="fw-bold mb-0">
            {firstSegment || 'Inicio'}
          </h4>

          {/* Espacio flexible para alinear elementos a la derecha */}
          <div className="d-flex align-items-center ms-auto">
            {/* Botón de pantalla completa */}
            <Button
              variant="outline-secondary"
              onClick={handleFullscreen}
              className="me-3"
            >
              <FaExpand /> {/* Ícono de pantalla completa */}
            </Button>

            {/* Información del usuario */}
            <div className="d-flex align-items-center">
              <FaUserCircle size={24} className="me-2" /> {/* Ícono de usuario */}
              <div>
                <div className="fw-bold">{username}</div> {/* Nombre de usuario */}
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {userRole} {/* Rol del usuario */}
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
      </Navbar>

      <Navbar style={{ borderTop: '1px solid #ddd', height: '50%' }} bg="light" expand="lg" className="shadow-sm">
        <Container fluid>
          <div className="ms-auto d-flex align-items-center" style={{ gap: '10px' }}>
            {actions} {/* Renderiza los componentes hijos (botones) */}
          </div>
        </Container>
      </Navbar>

    </>
  );
};

export default CustomNavbar;