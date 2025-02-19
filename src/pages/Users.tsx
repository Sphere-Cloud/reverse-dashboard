import { useState } from 'react';
import { Container, Row, Button, Table } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import UserDetail from './UserDetail';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import AddUserModal from '../components/AddUserModal';

interface Column {
  key: string;       // Clave única para la columna
  header: string;    // Encabezado de la columna
  render?: (data: any) => React.ReactNode; // Función para personalizar la renderización
}

interface UniversalTableProps {
  columns: Column[]; // Columnas de la tabla
  data: any[];       // Datos a mostrar
  itemsPerPage?: number; // Número de elementos por página
}

export default function Users() {
  const userColumns = [
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Nombre' },
    { key: 'lastname', header: 'Apellido' },
    { key: 'role', header: 'Rol' },
    { key: 'createdAt', header: 'Creado' },
    { key: 'updatedAt', header: 'Actualizado' }
  ];

  const userData = [
    { 
      id: 1, 
      name: 'Juan', 
      lastname: 'Pérez', 
      role: 'Admin', 
      createdAt: '2024-02-17T10:30:00Z', 
      updatedAt: '2024-02-18T12:00:00Z' 
    },
    { 
      id: 2, 
      name: 'María', 
      lastname: 'González', 
      role: 'Usuario', 
      createdAt: '2024-02-16T08:15:00Z', 
      updatedAt: '2024-02-19T14:45:00Z' 
    },
    { 
      id: 3, 
      name: 'Carlos', 
      lastname: 'Rodríguez', 
      role: 'Moderador', 
      createdAt: '2024-02-15T09:50:00Z', 
      updatedAt: '2024-02-20T11:30:00Z' 
    }
  ];

  const navigate = useNavigate();
  const itemsPerPage = 5; // Puedes ajustar este valor
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(userData.length / itemsPerPage);

  // Obtener los datos de la página actual
  const offset = currentPage * itemsPerPage;
  const currentData = userData.slice(offset, offset + itemsPerPage);

  const [showSidebar, setShowSidebar] = useState(false);

  // Función para abrir el Sidebar
  const handleShowSidebar = () => setShowSidebar(true);

  // Función para cerrar el Sidebar
  const handleCloseSidebar = () => {
    navigate('/usuarios')
    setShowSidebar(false)

  };

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const [showModal, setShowModal] = useState(false);

  const handleSaveUser = (newUser) => {
    console.log("Nuevo usuario guardado:", newUser);
    // Aquí puedes agregar la lógica para guardar el usuario en tu estado o API
  };
    
  return (
    <Container fluid style={{ height: '100%', padding: '0' }}>
      <Row style={{ height: '10%' }}>
        <CustomNavbar 
          actions={ 
            <> 
              <Button variant="secondary" onClick={() => setShowModal(true)}>
                Nuevo
              </Button>
            </>
          } 
        />
      </Row>

      <Row style={{ height: '90%' }}>
        <div className="table-component">
          <Table hover className="universal-table">
            <thead>
              <tr>
                {userColumns.map((column) => (
                  <th key={column.key}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  onClick={ () => { 
                    navigate(`${location.pathname}/${row.id}`);
                    handleShowSidebar();
                  } }
                >
                  {userColumns.map((column) => (
                    <td key={column.key}>
                      <div className="cell-content">
                        {column.render ? column.render(row) : row[column.key]}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Paginación */}
          <div className="pagination-container">
            <ReactPaginate
              previousLabel="Anterior"
              nextLabel="Siguiente"
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
        </div>
      </Row>

      {/* Mostrar Sidebar con detalles de usuario */}
      <UserDetail show={showSidebar} handleClose={handleCloseSidebar} />

      <AddUserModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleSave={handleSaveUser}
      />
    </Container>
  );
}
