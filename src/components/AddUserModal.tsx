import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Definimos las props del componente
interface AddUserModalProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (user: User) => Promise<void>;
  roles: Role[];
}


interface Role {
  id: number; // SERIAL PRIMARY KEY
  title: string; // VARCHAR(255) NOT NULL
  created_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  updated_at: Date; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

// Definimos la estructura del usuario
interface User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role_id: number;
  is_active: boolean;
  company_id: number
}

const AddUserModal: React.FC<AddUserModalProps> = ({ show, handleClose, handleSave, roles }) => {
  // Estado para manejar los datos del nuevo usuario
  const [newUser, setNewUser] = useState<User>({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role_id: 1,
    is_active: true,
    company_id: 1 //harcoded
  });

  // Manejador de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setNewUser({
      ...newUser,
      [name]: name == "role_id" ? (value ? parseInt(value, 10) : null) : value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = () => {
    handleSave(newUser);
    handleClose(); // Cerrar el modal después de guardar
    reset();
  };

  const reset = () => {
    setNewUser({
      name: '',
      lastname: '',
      email: '',
      password: '',
      role_id: 1,
      is_active: true,
      company_id: 1});
  };

  return (
    <Modal show={show} onHide={() => { reset(); handleClose();}}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Campo para el nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
            />
          </Form.Group>

          {/* Campo para el apellido */}
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={newUser.lastname}
              onChange={handleChange}
              placeholder="Ingrese el apellido"
            />
          </Form.Group>

          {/* Campo para el email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleChange}
              placeholder="Ingrese el email"
            />
          </Form.Group>

          {/* Campo para la contraseña */}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleChange}
              placeholder="Ingrese la contraseña"
            />
          </Form.Group>

          {/* Campo para el rol */}
          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              as="select"
              name="role_id"
              value={newUser.role_id}
              onChange={handleChange}
            >
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
              {/* Agrega más opciones según los roles disponibles en tu base de datos */}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* Botón para cerrar el modal */}
        <Button variant="secondary" onClick={() => { reset(); handleClose();}}>
          Cerrar
        </Button>

        {/* Botón para guardar el nuevo usuario */}
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;