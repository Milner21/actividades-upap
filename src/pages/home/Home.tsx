import styles from "./Home.module.css";
import { CourseCard } from "../../components";
import { useFetchCourses } from "../../hooks";

const Home = () => {
  const { courses, loading } = useFetchCourses();
  
  // Ordenar los cursos por fecha ASCENDENTE (los más próximos primero)
  const sortedCourses = [...courses].sort((a, b) => {
    return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Eventos Disponibles</h1>
      {loading ? (
        <p>Cargando Eventos...</p>
      ) : (
        <div className={styles.grid}>
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

