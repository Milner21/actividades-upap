import { Table, TitleAndToBack } from '../../../../components';
import { Column } from '../../../../components/table/types';
import { useFetchRegistrationsInCourse } from '../../../../hooks';
import { useDeleteInscripcion } from '../../../../hooks/useDeleteInscripcion';
import { useParams } from 'react-router-dom';
import { Inscripciones } from '../../../../types/Course';
import { Trash2 } from 'lucide-react';
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
    <div>
      <TitleAndToBack label="Listado de inscritos al evento" />
      <Table columns={columns} data={registrations} />
    </div>
  );
}

export default CourseRegistrationManager;
