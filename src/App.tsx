import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Login from './pages/Login';
import PointOfSale from './pages/PointOfSale';
import PointOfSales from './pages/PointOfSales';
import SaleDetail from './pages/SaleDetail';
import CashOut from './pages/CashOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <Container
        fluid
        style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '0' }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          <Route path="/puntos-venta" element={<PointOfSales />} />
          <Route path="/punto-venta/:id" element={<PointOfSale />} />

          <Route path="/panel" element={<Dashboard />} />
          <Route path="/corte-caja" element={<CashOut />} />

          <Route path="/configuracion" element={<Settings />} />

          <Route path="/ventas" element={<Sales />} />
          <Route path="/ventas/:id" element={<SaleDetail />} />

          <Route path="/inventario" element={<Inventory />} />
          <Route path="/inventario/:id" element={<Inventory />} />

          <Route path="/usuarios" element={<Users />} />
          <Route path="/usuarios/:id" element={<Users />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
