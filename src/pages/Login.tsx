import { useState } from 'react';
import { Form, Button, Container, Alert, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye, FaEyeSlash    } from "react-icons/fa";
import '../styles/login.css'
import login_bw from '/login_bg.png';

const Login = () => {

  const [credentials, setCredentials] = useState(
    {
      email: '',
      password: ''
    }
  )

  const handleInputChange = (e: any) => {
    console.log(e);
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!credentials.email || !credentials.password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await axios.post("http://78.13.0.202:8080/login", credentials);
      
      if (response.status === 200) {
        localStorage.setItem("user_name", JSON.stringify(response.data.usuario.name));
        localStorage.setItem("user_lastname", JSON.stringify(response.data.usuario.lastname));
        localStorage.setItem("user_id", JSON.stringify(response.data.usuario.id));
        localStorage.setItem("user_role_id", JSON.stringify(response.data.usuario.role_id));
        localStorage.setItem("user_company_id", JSON.stringify(response.data.usuario.company_id));


        navigate("/panel");
      } else {
        setError(response.data.mensaje || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Credenciales incorrectas o error del servidor.");
    }

  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container fluid style={{ width: "100%", padding: "0", display: "flex", flexWrap: "wrap" }}>
      {/* Columna de la imagen */}
      <Col md={7} style={{ padding: "0", overflow: "hidden" }}>
        <img
          src={login_bw}
          alt="Login_background"
          className="img-fluid"
          style={{ width: "100%", height: "100vh", objectFit: "cover" }}
        />
      </Col>

      {/* Columna del formulario */}
      <Col md={5} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "70%" }}>
          <h2 style={{ textAlign: "left" }}>Bienvenido</h2>
          <span style={{ textAlign: "left", width: "100%", display: "block" }} className="mb-4">
            <strong style={{ color: "#6C757D" }}>Ingresa a tu cuenta</strong>
          </span>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                name="email"
                placeholder="* Correo electrónico"
                value={credentials.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <div style={{ position: "relative", overflow: "hidden" }}>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="* Contraseña"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    right: "0px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "#DEE2E6",
                    border: "1px solid #DEE2E6",
                    cursor: "pointer",
                    padding: "5px",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash style={{ color: "#333" }} />
                  ) : (
                    <FaEye style={{ color: "#333" }} />
                  )}
                </button>
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>
          </Form>
        </div>
      </Col>
    </Container>
  );
};

export default Login;