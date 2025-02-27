import React from 'react';
import { Form } from 'react-bootstrap';
import '../styles/searchbar.css';

// Definimos las props del componente
interface SearchBarProps {
  onSearch: (query: string) => void; // Función que se ejecuta al cambiar el valor del input
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Buscar"
      className="form-imput"
      style={{ margin: '0 0 10px 0' }}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)} // Llama a onSearch con el valor del input
    />
  );
};

export default SearchBar;