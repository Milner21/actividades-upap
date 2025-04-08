import styles from "./Home.module.css";
import { useFetchCourses } from "../../hooks/useFetchCourses";
import { CourseCard } from "../../components";

const Home = () => {
  const { courses, loading } = useFetchCourses();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Eventos Disponibles</h1>
      {loading ? (
        <p>Cargando Eventos...</p>
      ) : (
        <div className={styles.grid}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
