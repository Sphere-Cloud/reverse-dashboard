import React from 'react';
import { Form } from 'react-bootstrap';
import '../styles/searchbar.css';

const SearchBar = ({ onSearch }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Buscar"
      className="form-imput"
      style={{ margin: '0 0 10px 0' }}
      onChange={(e) => onSearch(e.target.value)} // Llama a onSearch con el valor del input
    />
  );
};

export default SearchBar;