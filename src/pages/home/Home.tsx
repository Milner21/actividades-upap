import styles from "./Home.module.css";
import { CourseCard } from "../../components";
import { useFetchCourses } from "../../hooks";

const Home = () => {
  const { courses, loading } = useFetchCourses();
  
  // Filtrar solo los eventos con estado true (activos)
  const activeCourses = courses.filter(course => course.estado === true);
  
  // Ordenar los cursos por fecha ASCENDENTE (los más próximos primero)
  const sortedCourses = [...activeCourses].sort((a, b) => {
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });
  
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Eventos Disponibles</h1>
      {loading ? (
        <p>Cargando Eventos...</p>
      ) : sortedCourses.length > 0 ? (
        <div className={styles.grid}>
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p className={styles.noEvents}>No hay eventos disponibles actualmente</p>
      )}
    </div>
  );
};

export default Home;