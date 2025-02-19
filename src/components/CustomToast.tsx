import { useState } from "react";
import { Button, Toast, ToastContainer } from "react-bootstrap";

const CustomToast = ({ type = "info", message = "Mensaje por defecto", show, onClose }) => {
  // Colores según el tipo de mensaje
  const toastStyles = {
    success: { background: "#E7FAFA", border: "2px solid #00B374", text: "#00B374" }, // Verde
    danger: { background: "#FFD8D8", border: "2px solid #CC3333", text: "#CC3333" }, // Rojo
    warning: { background: "#FFF6EF", border: "2px solid #D35711", text: "#D35711" }, // Amarillo
    info: { background: "#EBF2FF", border: "2px solid #366AD9", text: "#366AD9" }, // Azul
  };

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        style={{
          backgroundColor: toastStyles[type]?.background || toastStyles.info.background,
          border: toastStyles[type]?.border || toastStyles.info.border, // Aplicar el borde aquí
        }}
      >
        <Toast.Body>
          <span style={{ color: toastStyles[type]?.text || toastStyles.info.text }}>
            {message}
          </span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;