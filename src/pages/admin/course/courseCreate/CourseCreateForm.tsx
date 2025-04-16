import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCreateCourse from '../../../../hooks';
import { Curso } from '../../../../types/Course';
import { ImageFieldCustom, NumberFieldCustom, TextField } from '../../../../components';

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
    <div className="formContent">
      <form onSubmit={handleSubmit} className="form">
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
        <hr className="divider" />

        {/* Botones */}
        <div className="buttonFormContainer">
          <button
            type="button"
            className="button buttonRed"
            onClick={handleGoBack}
          >
            Regresar
          </button>
          <button
            type="submit"
            className="button buttonSuccess"
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
