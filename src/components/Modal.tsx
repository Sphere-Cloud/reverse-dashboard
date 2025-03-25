import React, { useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

interface ModalProps {
  content: React.ReactElement;
  buttonGroup: React.ReactElement;
  title: string;
  show: boolean;
  handlers: {
    onClose: () => void;
  };
}

const Modal = ({ content, buttonGroup, title, show, handlers }: ModalProps) => {
  const [closeHovered, setCloseHovered] = useState(false);

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        style={{
          width: '600px',
          height: 'fit-content',
          border: '1px solid #ddd',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transform: 'scale(1)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            padding: '20px',
            background: 'rgb(242, 92, 5, 10%)'
          }}
        >
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
            {title}
          </h1>
          <IoIosCloseCircle
            onClick={handlers.onClose}
            onMouseEnter={() => setCloseHovered(true)}
            onMouseLeave={() => setCloseHovered(false)}
            style={{
              cursor: 'pointer',
              color: closeHovered ? '#666' : '#999',
              transition: 'color 0.2s ease',
              fontSize: '24px',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            minHeight: '100px',
            marginBottom: '20px',
            padding: '10px 0',
          }}
        >
          {content}
        </div>

        {/* Footer - Button Group */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            borderTop: '1px solid #ddd',
            padding: '20px',
          }}
        >
          {buttonGroup}
        </div>
      </div>
    </div>
  );
};

export default Modal;
