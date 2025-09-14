import { useEffect, useState } from 'react';
import { Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  company_id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role_id: number | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface SidebarProps {
  show: boolean;
  handleClose: () => void;
}

interface Role {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

interface UserWithRole extends User {
  role: string;
}

const UserDetail = ({ show, handleClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [userWithRole, setUserWithRole] = useState<UserWithRole | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUser(response.data);
        console.log("Usuario obtenido correctamente:", response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/roles");
        setRoles(response.data);
        console.log("Roles obtenidos correctamente:", response.data);
      } catch (error) {
        console.error("Error al obtener los roles:", error);
      }
    };

    fetchUser();
    fetchRoles();
  }, [id]);

  useEffect(() => {
    if (user && roles.length > 0) {
      const userRole = roles.find((role) => role.id === user.role_id);
      setUserWithRole({
        ...user,
        role: userRole ? userRole.title : "Sin rol"
      });
      console.log("Usuario con rol asignado:", {
        ...user,
        role: userRole ? userRole.title : "Sin rol"
      });
    }
  }, [user, roles]);

  const deleteUser = async () => {
    if (!id) return;
  
    try {
      await axios.delete(`http://localhost:8080/users/${id}`);
      console.log(`Usuario con ID ${id} eliminado correctamente.`);
      
      // Aquí podrías actualizar la lista de usuarios o cerrar el modal
      navigate('/usuarios');
      window.location.reload();
      
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };
  

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {userWithRole ? `${userWithRole.name} ${userWithRole.lastname}` : "Cargando..."}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {userWithRole ? (
          <Row>
            <Col md={4} className="d-flex justify-content-center">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userWithRole.name + " " + userWithRole.lastname)}`}
                alt={userWithRole.name}
                className="rounded-circle"
                width="100"
                height="100"
              />
            </Col>
            <Col md={8}>
              <p><strong>Email:</strong> {userWithRole.email}</p>
              <p><strong>Role:</strong> {userWithRole.role}</p>
              <p><strong>Joined:</strong> {new Date(userWithRole.created_at).toLocaleDateString()}</p>
            </Col>
          </Row>
        ) : (
          <p>Cargando datos...</p>
        )}
        <div className="d-flex justify-content-end mt-3">
          <Button variant="secondary" onClick={() => { deleteUser(); }}>
            Eliminar
          </Button>
          <Button variant="primary" onClick={() => {}} className="ms-2">
            Editar
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetail;
