import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';



// Definimos los tipos para las propiedades del componente
interface CustomToastProps {
  type?: string;
  message?: string;
  show: boolean;
  onClose: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({ type = 'info', message = 'Mensaje por defecto', show, onClose }) => {
  // Estilos según el tipo de mensaje
  const toastStyles = {
    success: { background: '#E7FAFA', border: '2px solid #00B374', text: '#00B374' }, // Verde
    danger: { background: '#FFD8D8', border: '2px solid #CC3333', text: '#CC3333' }, // Rojo
    warning: { background: '#FFF6EF', border: '2px solid #D35711', text: '#D35711' }, // Amarillo
    info: { background: '#EBF2FF', border: '2px solid #366AD9', text: '#366AD9' }, // Azul
  };

  return (
    <ToastContainer position="bottom-end" className="p-3">
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        style={{
          backgroundColor: type === 'success' ? toastStyles.success.background :
                          type === 'danger' ? toastStyles.danger.background :
                          type === 'warning' ? toastStyles.warning.background :
                          toastStyles.info.background,
          border: type === 'success' ? toastStyles.success.border :
                  type === 'danger' ? toastStyles.danger.border :
                  type === 'warning' ? toastStyles.warning.border :
                  toastStyles.info.border,
        }}
      >
        <Toast.Body>
          <span style={{ 
              color: type === 'success' ? toastStyles.success.text :
                     type === 'danger' ? toastStyles.danger.text :
                     type === 'warning' ? toastStyles.warning.text :
                     toastStyles.info.text,
            }}>
            {message}
          </span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;