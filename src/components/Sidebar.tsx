import { Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '/reverse.png'
import {
  FaTachometerAlt, // Ícono de Dashboard
  FaCashRegister, // Ícono de Punto Venta
  FaShoppingCart, // Ícono de Ventas
  FaBoxes, // Ícono de Inventario
  FaUsers, // Ícono de Usuarios
  FaMoneyCheckAlt, // Ícono de Corte de Caja
  FaCog, // Ícono de Configuración
} from 'react-icons/fa';

interface SidebarProps {
  show: boolean;
  handleClose: () => void;
}

const Sidebar = ({ show, handleClose }: SidebarProps) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="start">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="d-flex align-items-center">
          <img
            src={logo} // Ruta del logo
            alt="Logo de Revrse" // Texto alternativo
            width="50" // Ancho del logo
            height="50" // Alto del logo
            className="me-2" // Margen a la derecha
          />
          Revrse
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body
        style={{ color: '#333' }}
        className="d-flex flex-column justify-content-between h-100" // Flexbox para distribuir los elementos
      >
        {/* Primer Nav (arriba) */}
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/panel"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/panel' ? 'active' : ''
            }`}
          >
            <span>Dashboard</span>
            <FaTachometerAlt className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/puntos-venta"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/puntos-venta' ? 'active' : ''
            }`}
          >
            <span>Puntos de Venta</span>
            <FaCashRegister className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/ventas"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/ventas' ? 'active' : ''
            }`}
          >
            <span>Ventas</span>
            <FaShoppingCart className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/inventario"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/inventario' ? 'active' : ''
            }`}
          >
            <span>Inventario</span>
            <FaBoxes className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/usuarios"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/usuarios' ? 'active' : ''
            }`}
          >
            <span>Usuarios</span>
            <FaUsers className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/corte-caja"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/corte-caja' ? 'active' : ''
            }`}
          >
            <span>Corte de Caja</span>
            <FaMoneyCheckAlt className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
        </Nav>

        {/* Último Nav (abajo) */}
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/configuracion"
            onClick={handleClose}
            className={`d-flex justify-content-between align-items-center ${
              location.pathname === '/configuracion' ? 'active' : ''
            }`}
          >
            <span>Configuración</span>
            <FaCog className="ms-2" size={25} /> {/* Ícono a la derecha */}
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="#"
            onClick={handleClose}
            className="d-flex justify-content-between align-items-center"
          >
            <span style={{ fontSize: '12px' }}>REVRSE V0.1</span>
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;