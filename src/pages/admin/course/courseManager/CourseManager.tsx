import { Table, TitleAndToBack } from '../../../../components';
import { Column } from '../../../../components/table/types';
import { useFetchCourses } from '../../../../hooks';
import RoutesConfig from '../../../../routes/RoutesConfig';
import { Curso } from '../../../../types/Course';
import { useNavigate } from 'react-router-dom';

function CourseManager() {
  const { courses, loading } = useFetchCourses();
  const navigate = useNavigate(); // Obtén la función navigate

  const columns: Column<Curso>[] = [
    { key: 'nombre', label: 'Nombre' },
    {
      key: 'fecha',
      label: 'Fecha de Inicio',
      render: (value) => {
        if (typeof value === 'string' && value.includes('T')) {
          const datePart = value.split('T')[0];
          const [year, month, day] = datePart.split('-');
          return `${day}/${month}/${year}`;
        }
        return 'Sin fecha';
      },
    },
    {
      key: 'hora',
      label: 'Horario',
      render: (value) => {
        if (typeof value === 'string') {
          return value.slice(0, 5);
        }
        return 'Sin horario';
      },
    },
    {
      key: 'estado',
      label: 'Estado',
      render: (value) => {
        const isActive = value === true;
        return (
          <span
            style={{
              backgroundColor: isActive ? '#e6f9f0' : '#fdecea',
              color: isActive ? '#1a7f4f' : '#a12020',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '0.875rem',
              display: 'inline-block',
            }}
          >
            {isActive ? 'Activo' : 'Inactivo'}
          </span>
        );
      },
    },
    { key: 'cupos', label: 'Cupos Disponibles' },
  ];

  return (
    <div>
      <TitleAndToBack label="Eventos registrados" />

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table
          columns={columns}
          data={courses}
          onRowClick={(id) => {
            navigate(RoutesConfig.courseInscritos(String(id)));
          }}
        />
      )}
    </div>
  );
}

export default CourseManager;
