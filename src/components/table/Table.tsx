// Table.tsx
import styles from './Table.module.css';
import { useState } from 'react';
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

type DataRow = {
  id: string | number; // <- obligatorio
  [key: string]: string | number | boolean | null | Date;
};

type Column = {
  key: string;
  label: string;
};

type Props = {
  columns: Column[];
  data: DataRow[];
  onRowClick?: (rowId: string | number) => void;
};

export default function Table({ columns, data, onRowClick }: Props) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, data.length);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy] = useState<keyof DataRow>('');

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnKey);
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

  const sortedData = [...filteredData].sort((a, b) =>
    sortDirection === 'asc'
      ? String(a[sortBy]).localeCompare(String(b[sortBy]))
      : String(b[sortBy]).localeCompare(String(a[sortBy])),
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reiniciar a la primera página al buscar
          }}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className={`${styles.th} ${sortColumn === col.key ? styles.sorted : ''}`}
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
            {paginatedData.map((row, idx) => (
              <tr
                key={row.id ?? idx}
                onClick={() => onRowClick?.(row.id)}
                className={styles.tr}
              >
                {columns.map((col) => (
                  <td className={styles.td} key={col.key}>
                    {row[col.key] instanceof Date
                      ? (row[col.key] as Date).toLocaleDateString()
                      : String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <label>
          Filas por página:{' '}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 20, 50, 100].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.paginationControls}>
          <button
            className={styles.pageButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <span className={styles.pageRange}>
            {start}–{end} de {data.length}
          </span>

          <button
            className={styles.pageButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
