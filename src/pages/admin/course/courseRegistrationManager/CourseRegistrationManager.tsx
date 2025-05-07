import { Table, TitleAndToBack } from '../../../../components';
import { Column } from '../../../../components/table/types';
import { useFetchRegistrationsInCourse } from '../../../../hooks';
import { useDeleteInscripcion } from '../../../../hooks/useDeleteInscripcion';
import { useParams } from 'react-router-dom';
import { Inscripciones } from '../../../../types/Course';
import { Trash2, Printer } from 'lucide-react';
import { useState } from 'react';
import styles from './CourseRegistrationManager.module.css';

// Extendemos el tipo para incluir acciones (solo para uso en el componente)
type InscripcionesConAcciones = Inscripciones & {
  acciones?: React.ReactNode; // Campo virtual, no existe en la base de datos
};

function CourseRegistrationManager() {
  const { id } = useParams<{ id: string }>(); // Obtiene el id del curso de la URL
  const courseId = id ?? ''; // Maneja el caso donde id es undefined
  const { registrations, loading, error, refreshRegistrations } =
    useFetchRegistrationsInCourse(courseId);
  const { deleteInscripcion, isDeleting } = useDeleteInscripcion();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (
    registrationId: string | number,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation(); // Prevenir que se active el onRowClick

    if (!confirm('¿Estás seguro de eliminar esta inscripción?')) {
      return;
    }

    try {
      setDeletingId(String(registrationId));
      const success = await deleteInscripcion(registrationId);

      if (success) {
        // Actualizar la lista de inscripciones
        await refreshRegistrations();
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar la inscripción');
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrint = () => {
    // Crear una ventana nueva para la impresión
    const printWindow = window.open('', '_blank');
    
    // Verificar si la ventana se abrió correctamente
    if (!printWindow) {
      alert('El navegador ha bloqueado la ventana emergente. Por favor, permite las ventanas emergentes para imprimir.');
      return;
    }
    
    // Obtener la fecha actual formateada
    const fechaActual = new Date().toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Ordenar registros por nombre alfabéticamente
    const sortedRegistrations = [...registrations].sort((a, b) => {
      const nombreA = a.nombre?.toLowerCase() || '';
      const nombreB = b.nombre?.toLowerCase() || '';
      return nombreA.localeCompare(nombreB);
    });
    
    // Generar el HTML para la tabla de impresión
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Listado de Inscritos</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
          }
          tr:nth-child(even) {
            background-color: #f9f9f9;
          }
          h1 {
            color: #333;
            text-align: center;
            font-size: 18px;
          }
          .print-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .print-date {
            font-style: italic;
            color: #666;
          }
          .print-footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #ddd;
            padding-top: 10px;
          }
          @media print {
            .no-print {
              display: none;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>Listado de Inscritos al Evento</h1>
          <p class="print-date">Fecha de impresión: ${fechaActual}</p>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Semestre</th>
              <th>Pagó</th>
              <th>Asistió</th>
            </tr>
          </thead>
          <tbody>
            ${sortedRegistrations.map((registro, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${registro.nombre || ''}</td>
                <td>${registro.correo || ''}</td>
                <td>${registro.telefono || ''}</td>
                <td>${registro.semestre || ''}</td>
                <td>${registro.estado || ''}</td>
                <td>${registro.asistencia || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="print-footer">
          <p>Total de inscripciones: ${sortedRegistrations.length}</p>
        </div>
        
        <script>
          window.onload = function() {
            window.print();
          }
        </script>
      </body>
      </html>
    `;
    
    try {
      // Escribir el contenido en la nueva ventana y imprimir
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    } catch (error) {
      console.error('Error al preparar la impresión:', error);
      alert('Ha ocurrido un error al preparar la impresión.');
    }
  };

  const columns: Column<InscripcionesConAcciones>[] = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'correo', label: 'Correo' },
    { key: 'telefono', label: 'Teléfono' },
    { key: 'semestre', label: 'Semestre' },
    { key: 'estado', label: 'Pagó' },
    { key: 'asistencia', label: 'Asistió' },
    { key: 'medio_de_pago', label: 'Medio de pago' },
    {
      key: 'fecha_inscripcion',
      label: 'Inscripcion',
      render: (value) => {
        const date = new Date(value as string);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
        return 'Sin fecha';
      },
    },
    {
      key: 'fecha_modificacion',
      label: 'Modificacion',
      render: (value) => {
        const date = new Date(value as string);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        }
        return 'Sin fecha';
      },
    },
    {
      key: 'acciones',
      label: 'Acciones',
      render: (_, row) => (
        <button
          onClick={(e) => handleDelete(row.id, e)}
          disabled={deletingId === String(row.id) || isDeleting}
          className={styles.button}
          title="Eliminar inscripción"
        >
          <span>
            <Trash2 size={18} />
          </span>
        </button>
      ),
    },
  ];

  if (loading) {
    return <p>Cargando inscripciones...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ position: 'relative', minHeight: '400px' }}>
      <TitleAndToBack label="Listado de inscritos al evento" />

      <Table columns={columns} data={registrations} />
      
      {/* Botón flotante de impresión */}
      <button
        onClick={handlePrint}
        className={styles.printButton}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#3B82F6',
          color: 'white',
          borderRadius: '50%',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        title="Imprimir listado"
      >
        <Printer size={24} />
      </button>
    </div>
  );
}

export default CourseRegistrationManager;