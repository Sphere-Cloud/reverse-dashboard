import { useEffect, useState } from 'react';
import { Container, Row, Button, Table } from 'react-bootstrap';
import CustomNavbar from '../components/CustomNavbar';
import UserDetail from './UserDetail';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import AddUserModal from '../components/AddUserModal';
import axios from 'axios';

interface User {
  id: number; // SERIAL PRIMARY KEY
  company_id: number; // INTEGER REFERENCES companies(id) ON DELETE CASCADE
  name: string; // VARCHAR(255) NOT NULL
  lastname: string; // VARCHAR(255) NOT NULL
  email: string; // VARCHAR(255) NOT NULL UNIQUE
  password: string; // VARCHAR(255) NOT NULL
  role_id: number | null; // INTEGER REFERENCES roles(id) ON DELETE SET NULL
  created_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  is_active: boolean; // BOOLEAN DEFAULT TRUE
}

interface CreateUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role_id: number;
  is_active: boolean;
  company_id: number;
}

interface Role {
  id: number; // SERIAL PRIMARY KEY
  title: string; // VARCHAR(255) NOT NULL
  created_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

interface UserWithRole extends User {
  role: string; // Objeto Role completo
}


export default function Users() {

  const [usersData, setUsersData] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [usersWithRole, setUsersWithRole] = useState<UserWithRole[]>([]);

  useEffect(() => {

    const fetchUsers = async() => {
      try {

        const response = await axios.get("http://78.13.0.202:8080/users");
        setUsersData(response.data)

        console.log("Se obtuvo usuarios correctamente: ", response.data); 
        
      } catch(error) {
        console.error("Hubo un error al obtener los usuarios: ", error)
      }
    }

    const fetchRoles = async() => {
      try {
        const response = await axios.get("http://78.13.0.202:8080/roles");
        setRoles(response.data);

        console.log("Se obtuvo usuarios correctamente: ", response.data);
      } catch (error) {
        console.error("Hubo un error al obtener los roles: ", error)
      }
    }

    fetchUsers();
    fetchRoles();

  }, [])

  useEffect(() => {
    if (usersData.length > 0 && roles.length > 0) {
      const usersWithRolesMapped = usersData.map((user) => {
        const userRole = roles.find((role) => role.id === user.role_id);
        return {
          ...user,
          role: userRole ? userRole.title : "Sin rol", // Si no tiene role_id asignado
        };
      });

      setUsersWithRole(usersWithRolesMapped);
      console.log("Usuarios con roles asignados: ", usersWithRolesMapped);
    }
  }, [usersData, roles]);


  const userColumns = [
    { key: 'id', header: 'ID', render: (row: UserWithRole) => row.id },
    { key: 'name', header: 'Nombre', render: (row: UserWithRole) => row.name },
    { key: 'lastname', header: 'Apellido', render: (row: UserWithRole) => row.lastname },
    { key: 'email', header: 'Email', render: (row: UserWithRole) => row.email },
    { key: 'role', header: 'Rol', render: (row: UserWithRole) => row.role },
    { key: 'createdAt', header: 'Creado', render: (row: UserWithRole) => row.created_at },
    { key: 'updatedAt', header: 'Actualizado', render: (row: UserWithRole) => row.updated_at }
  ];


  const navigate = useNavigate();
  const itemsPerPage = 5; // Puedes ajustar este valor
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(usersData.length / itemsPerPage);

  // Obtener los datos de la página actual
  const offset = currentPage * itemsPerPage;
  const currentData = usersWithRole.slice(offset, offset + itemsPerPage);

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

  const handleSaveUser = async (payload: CreateUser) => {

    console.log(payload);

    try {
      const response = await axios.post("http://78.13.0.202:8080/users", payload)
      setUsersData( (prevData) => [...prevData, response.data] );

      const userRole = roles.find((role) => role.id === response.data.role_id);

      const userWithRole = {
        ...response.data,
        role: userRole ? userRole.title : "Sin rol"
      }

      setUsersWithRole((prevData) => [...prevData, userWithRole]);


      console.log("Nuevo usuario guardado:", response.data);
    } catch (error) {
      console.error("Hubo un error al registrar el usuario: ", error)
    }

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
                        {column?.render != null ? column.render(row) : (row as any)[column.key]}
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
        handleClose={() => {setShowModal(false)}}
        handleSave={handleSaveUser}
        roles={roles}
      />
    </Container>
  );
}
