import { ChangeEvent, FormEvent, useState } from 'react';
import useCreateCourse from '../../hooks/useCreateCourse';
import styles from './CreateCouseForm.module.css';
import { Curso } from '../../types/Course';
import TextField from '../textfield/TextField';
import NumberFieldCustom from '../numberField';
import ImageFieldCustom from '../imageField';
import { useNavigate } from 'react-router-dom';

const initialCourseState: Curso = {
  id: 0,
  nombre: '',
  cupos: 1,
  fecha: '',
  hora: '',
  estado: true,
};

const CreateCourseForm = () => {
  const navigate = useNavigate(); // Para manejar la navegación

  const [formData, setFormData] = useState<Curso>(initialCourseState);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { createCourse, loading } = useCreateCourse();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoBack = () => {
    navigate(-1); // Navegar a la página anterior
  };


  /*const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedImage(file); // Usar un estado (si es React) para guardar el archivo seleccionado
  };*/

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(formData, selectedImage);
      setFormData(initialCourseState);
      setSelectedImage(null);
    } catch (error) {
      console.error('Error en el handleSubmit:', error);
    }
  };

  return (
    <div className={styles.formContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextField
          name="nombre"
          label="Nombre"
          type="text"
          placeholder="Introduce un nombre"
          value={formData.nombre}
          onChange={handleChange}
          errorMessage="Por favor ingresa el nombre del evento"
          required
        />
        <NumberFieldCustom
          name="cupos"
          value={formData.cupos}
          label="Cantidad de cupos"
          onChange={(nuevoValor) =>
            setFormData((prevState) => ({ ...prevState, cupos: nuevoValor }))
          }
        />
        <TextField
          name="fecha"
          label="Fecha del evento"
          type="date"
          value={formData.fecha}
          onChange={handleChange}
          required
        />
        <TextField
          name="hora"
          label="Hora del evento"
          type="time"
          value={formData.hora}
          onChange={handleChange}
          required
        />
        <ImageFieldCustom
          name="imagen"
          label="Caratula del Evento"
          onChange={(file) => setSelectedImage(file)}
        />

        {/* Divider */}
        <hr className={styles.divider} />

        {/* Botones */}
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={`${styles.button} ${styles.backButton}`}
            onClick={handleGoBack}
          >
            Regresar
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.createButton}`}
            disabled={loading}
          >
            {loading ? 'Creando curso...' : 'Crear curso'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourseForm;
