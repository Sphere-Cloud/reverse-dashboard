import { useState } from 'react';
import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

const userData = {
  id: 1,
  name: "Robert Fox",
  email: "jackson.graham@example.com",
  phone: "(704) 555-0127",
  role: "SaaS Patterns",
  createdAt: "November 26, 2023",
  location: "Sydney, Australia",
  totalOrders: 9,
  lifetimeValue: "$49.00",
  tasksCompleted: 23,
  totalProjects: 5,
};

interface SidebarProps {
  show: boolean;
  handleClose: () => void;
}

const UserDetail = ({ show, handleClose }: SidebarProps) => {

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{userData.name}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col md={4} className="d-flex justify-content-center">
            <img src={`https://ui-avatars.com/api/name=${userData.name}`} alt={userData.name} className="rounded-circle" width="100" height="100" />
          </Col>
          <Col md={8}>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Role:</strong> {userData.role}</p>
            <p><strong>Joined:</strong> {userData.createdAt}</p>
            <p><strong>Location:</strong> {userData.location}</p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p><strong>Total Orders:</strong> {userData.totalOrders}</p>
          </Col>
        </Row>
        <div className="d-flex justify-content-end mt-3 ">
          <Button variant="secondary" onClick={() => {}}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={() => {}}>
            Editar
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default UserDetail;