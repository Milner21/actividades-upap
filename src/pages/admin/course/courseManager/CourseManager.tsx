import { Table } from '../../../../components';
import { useFetchCourses } from '../../../../hooks';


function CourseManager() {
  const { courses, loading } = useFetchCourses();

  const columns = [
    { key: 'nombre', label: 'Nombre' },
    { key: 'fecha', label: 'Fecha de Inicio' },
    { key: 'hora', label: 'Horario' },
    { key: 'cupos', label: 'Cupos Disponibles' },
    { key: 'estado', label: 'Estado' },
    // Asegúrate de agregar las demás columnas necesarias
  ];
  
  const mappedCourses = courses.map((course) => ({
    ...course,
    fecha: new Date(course.fecha), // <-- lo convertís a tipo Date
  }));
  

  return (
    <div>
      <h1 className="titlePrimary">Listado de Cursos</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <Table
          columns={columns}
          data={mappedCourses}
          onRowClick={(id) => {
            console.log('Clicaste la fila con id:', id);
          }}
        />
      )}
    </div>
  );
}

export default CourseManager;
