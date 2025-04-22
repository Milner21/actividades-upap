import { Table } from '../../../../components';
import { Column } from '../../../../components/table/types';
import { useFetchRegistrationsInCourse } from '../../../../hooks';
import { useParams } from 'react-router-dom';
import { Inscripciones } from '../../../../types/Course';

function CourseRegistrationManager() {
  const { id } = useParams<{ id: string }>(); // Obtiene el id del curso de la URL
  const courseId = id ?? ''; // Maneja el caso donde id es undefined
  const { registrations, loading, error } =
    useFetchRegistrationsInCourse(courseId);

    const columns: Column<Inscripciones>[] = [
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
    ];

  if (loading) {
    return <p>Cargando inscripciones...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1 className="titlePrimary">Listado de inscritos al evento</h1>
      <Table columns={columns} data={registrations} />
    </div>
  );
}

export default CourseRegistrationManager;
