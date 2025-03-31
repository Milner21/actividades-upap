import React from 'react';
import { useCourseContext } from '../context/CourseContext';

// Definimos la interfaz para las props del componente
interface CourseCardProps {
  id: string; // Identificador del curso
  nombre: string; // Nombre del curso
  cupos_disponibles: number; // Número de cupos disponibles
}

// Componente que muestra la información de un curso
const CourseCard: React.FC<CourseCardProps> = ({
  id,
  nombre,
  cupos_disponibles,
}) => {
  // Usamos el contexto para acceder a la función de inscribir curso
  const { inscribirCurso } = useCourseContext();

  // Función que se ejecuta cuando el usuario hace clic para inscribirse
  const handleInscripcion = () => {
    if (cupos_disponibles > 0) {
      // Si hay cupos disponibles, inscribe al usuario
      inscribirCurso(id);
      alert('¡Te has inscrito con éxito!');
    } else {
      // Si no hay cupos, muestra un mensaje de error
      alert('Lo sentimos, no hay cupos disponibles.');
    }
  };

  return (
    <div style={{ margin: '10px', border: '1px solid black', padding: '10px' }}>
      <h3>{nombre}</h3> {/* Muestra el nombre del curso */}
      <p>Cupos disponibles: {cupos_disponibles}</p>{' '}
      {/* Muestra el número de cupos disponibles */}
      <button onClick={handleInscripcion} disabled={cupos_disponibles === 0}>
        {cupos_disponibles > 0 ? 'Inscribirse' : 'No hay cupos'}
      </button>
    </div>
  );
};

export default CourseCard;
