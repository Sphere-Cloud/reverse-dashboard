import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CustomNavbar from "../components/CustomNavbar";
import CustomToast from "../components/CustomToast";
import Loading from "../components/Loading";

export default function Settings() {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [toastConfig, setToastConfig] = useState({
    show: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setLoading(false); // Finaliza la carga
      }, 3000);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      // Simula un envío de datos (puedes reemplazarlo con una llamada a una API)
      console.log("Datos del formulario:", Object.fromEntries(formData));

      // Simulación de éxito
      setToastConfig({
        show: true,
        type: "success",
        message: "Configuración guardada con éxito",
      });

      // Aquí podrías reiniciar el formulario si es necesario
      event.target.reset();
    } catch (error) {
      // Manejo de error
      setToastConfig({
        show: true,
        type: "danger",
        message: "Error al guardar la configuración",
      });
    }
  };

  return (
    <Container fluid style={{ height: "100%"}}>
      <Row style={{ height: "10%" }}>
        <CustomNavbar
          actions={
            <>
              <Button variant="secondary" type="submit" form="configForm">
                Guardar Configuración
              </Button>
            </>
          }
        />
      </Row>
      <Row style={{ height: "90%" }}>
        <Col md={6}>
          <div style={{ margin: "20px 0" }}>
            <Form id="configForm" onSubmit={handleFormSubmit}>
              <Form.Group controlId="formLogo" className="mb-3 text-start">
                <Form.Label>Logo de la Empresa</Form.Label>
                <Form.Control type="file" accept="image/*" name="logo" />
              </Form.Group>

              <Form.Group controlId="formTitulo" className="mb-3 text-start">
                <Form.Label>Título de la Empresa</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el título de la empresa"
                  name="titulo"
                />
              </Form.Group>

              <Form.Group controlId="formSitioWeb" className="mb-3 text-start">
                <Form.Label>Sitio Web</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el sitio web de la empresa"
                  name="sitioWeb"
                />
              </Form.Group>

              <Form.Group controlId="formDireccion" className="mb-3 text-start">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la Calle Empresa"
                  name="address"
                />
              </Form.Group>

              <Form.Group controlId="formDireccion" className="mb-3 text-start">
                <Form.Label>Codigo Postal</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la Codigo Postal"
                  name="postal-code"
                />
              </Form.Group>

              <Form.Group controlId="formDireccion" className="mb-3 text-start">
                <Form.Label>Colonia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la Colonia Empresa"
                  name="neighborhood"
                />
              </Form.Group>

              <Form.Group controlId="formDireccion" className="mb-3 text-start">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa la Estado"
                  name="state"
                />
              </Form.Group>

              <Form.Group controlId="formTelefono" className="mb-3 text-start">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa el teléfono de la empresa"
                  name="telefono"
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>

      {/* Toast para mostrar notificaciones */}
      <CustomToast
        type={toastConfig.type}
        message={toastConfig.message}
        show={toastConfig.show}
        onClose={() => setToastConfig((prev) => ({ ...prev, show: false }))}
      />
    </Container>
  );
}
