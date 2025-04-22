import styles from './Table.module.css';
import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Column, Row } from './types';
import { sortData } from './tableUtils';

type Props<T> = {
  columns: Column<Row<T>>[];
  data: Row<T>[];
  onRowClick?: (rowId: string | number) => void;
};

export default function Table<T>({ columns, data, onRowClick }: Props<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (key: keyof T) => {
    if (sortColumn === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter((row) =>
    columns.some((col) => {
      const value = row[col.key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    }),
  );

  const sortedData = sortData(filteredData, sortColumn, sortDirection);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.searchBar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>#</th>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key as keyof T)}
                  className={`${styles.th} ${
                    sortColumn === col.key ? styles.sorted : ''
                  }`}
                >
                  {col.label}
                  <span className={styles.sortIcon}>
                    {sortColumn === col.key ? (
                      sortDirection === 'asc' ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )
                    ) : (
                      <ChevronsUpDown size={16} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row.id)}
                className={styles.tr}
              >
                <td className={styles.td}>
                  {(currentPage - 1) * rowsPerPage + i + 1}
                </td>
                {columns.map((col) => {
                  const cellValue = row[col.key];
                  // Convertir boolean a string si es necesario
                  const displayValue =
                    typeof cellValue === 'boolean'
                      ? cellValue
                        ? 'Sí'
                        : 'No'
                      : col.render
                        ? col.render(cellValue, row)
                        : String(cellValue ?? '');
                  return (
                    <td key={String(col.key)} className={styles.td}>
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <label>
          Filas por página:
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.paginationControls}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>

          <span className={styles.pageRange}>
            {Math.min((currentPage - 1) * rowsPerPage + 1, sortedData.length)}–
            {Math.min(currentPage * rowsPerPage, sortedData.length)} de{' '}
            {sortedData.length}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
