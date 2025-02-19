import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Simulación de autenticación
    if (email === 'admin@example.com' && password === 'password') {
      // Redirigir al dashboard después del login
      navigate('/panel');
    } else {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <Container className="login-container">
      <div className="login-form">
        <h2 className="text-center mb-4">Inicio de sesión</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label style={{ textAlign: 'left', display: 'block', width: '100%' }}>
              Correo Electrónico
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label style={{ textAlign: 'left', display: 'block', width: '100%' }}>
              Contraseñas
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;