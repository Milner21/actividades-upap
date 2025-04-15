import { FormEvent, useState } from 'react';
import styles from './InscripcionForm.module.css';
import { useCreateInscripcion } from '../../hooks/useCreateInscripcion';
import { useNavigate } from 'react-router-dom';
import TextField from '../textfield';
import SelectField from '../selectField/SelectField';
import { SEMESTRES } from '../../utils/semestres';

interface InscripcionProps {
  curso_id: string;
}

const InscripcionForm = ({ curso_id }: InscripcionProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    semestre: '',
  });

  const { createInscripcion, loading } = useCreateInscripcion(); // Usamos los estados del hook
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const inscripcionData = {
      ...formData,
      curso_id,
    };
    const response = await createInscripcion(inscripcionData);

    if (response?.success) {
      setFormData({
        nombre: '',
        telefono: '',
        correo: '',
        semestre: '',
      });
    } else {
      console.error('Fallo en la inscripción desde el componente:', response);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.formContent}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Completa los campos</h2>
        <TextField
          name="nombre"
          label="Nombre y Apellido"
          type="text"
          placeholder="Introduce tu nombre y apellido"
          value={formData.nombre}
          onChange={handleChange}
          errorMessage="Por favor ingrese sus datos"
          required
        />
        <TextField
          name="telefono"
          label="Número de teléfono"
          type="text"
          placeholder="Introduce tu número telefónico"
          value={formData.telefono}
          onChange={handleChange}
          errorMessage="Por favor ingrese sus datos"
          required
        />
        <TextField
          name="correo"
          label="Correo electrónico"
          type="email"
          placeholder="example@gmail.com"
          value={formData.correo}
          onChange={handleChange}
          errorMessage="Por favor ingrese sus datos"
          required
        />
        <SelectField
          label="Curso"
          name="semestre"
          value={formData.semestre}
          onChange={(value) => setFormData({ ...formData, semestre: value })}
          options={SEMESTRES.map((s) => ({ label: s, value: s.toLowerCase() }))}
          placeholder="Seleccione un semestre"
        />

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
            className={`${styles.button} ${styles.submitButton}`}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Inscribirse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InscripcionForm;
