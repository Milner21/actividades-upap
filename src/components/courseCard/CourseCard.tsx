import styles from './CourseCard.module.css';
import { Curso as Course } from '../../types/Course';
import { formatDate } from '../../utils/formatDate';
import defaultImage from '../../../src/assets/default-course.png'; // Imagen por defecto
import RoutesConfig from '../../routes/RoutesConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type CourseProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseProps) => {
  const navigate = useNavigate();

  // Si existe `course.imagen`, usar esa URL; de lo contrario, usar la imagen por defecto
  const imageUrl =
    course.imagenUrl === 'default' ? defaultImage : course.imagenUrl;

  const handleRegisterClick = () => {
    if (course.cupos === 0) {
      toast.error('No hay cupos disponibles para este evento.');
      return;
    }
    navigate(RoutesConfig.registration(String(course.id)));
  };

  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt="Imagen del curso"
        className={styles.img}
        loading="lazy"
      />

      <h2 className={styles.title}>{course.nombre}</h2>
      <p className={styles.date}>
        Fecha: {formatDate(course.fecha)}
        <br />
        <span className={styles.time}>Hora: {course.hora.slice(0, 5)} hs.</span>
      </p>
      <p
        className={`${styles.slots} ${
          course.cupos > 0 ? styles.available : styles.full
        }`}
      >
        Cupos disponibles: {course.cupos}
      </p>
      <button onClick={handleRegisterClick} className={styles.button}>
        Inscribirse
      </button>
    </div>
  );
};

export default CourseCard;
