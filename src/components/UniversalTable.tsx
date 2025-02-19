import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

import { useNavigate } from 'react-router-dom';
import '../styles/universal-table.css'; // Importa los estilos CSS

interface Column {
  key: string;       // Clave única para la columna
  header: string;    // Encabezado de la columna
  render?: (data: any) => React.ReactNode; // Función para personalizar la renderización
}

interface UniversalTableProps {
  columns: Column[]; // Columnas de la tabla
  data: any[];       // Datos a mostrar
  itemsPerPage?: number; // Número de elementos por página
}

const UniversalTable = ({ columns, data, itemsPerPage = 15 }: UniversalTableProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  // Calcular el número total de páginas
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Obtener los datos de la página actual
  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  // Manejar el cambio de página
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="table-component">
      <Table hover className="universal-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={ () => navigate(`${location.pathname}/${row.folio ? row.folio : row.id}`) }>
              {columns.map((column) => (
                <td key={column.key}>
                  
                    <div className="cell-content">
                      {column.render ? column.render(row) : row[column.key]}
                    </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginación */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel="Anterior"
          nextLabel="Siguiente"
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default UniversalTable;