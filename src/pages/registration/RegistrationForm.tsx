import React, { FormEvent, useState } from 'react';
import { useCreateInscripcion } from '../../hooks/useCreateInscripcion';
import { useNavigate } from 'react-router-dom';
import { SEMESTRES } from '../../utils/semestres';
import { TextField } from '../../components';
import SelectField from '../../components/selectField/SelectField';
import { Inscripciones } from '../../types/Course';

interface InscripcionProps {
  curso_id: string;
}
const initialRegistrationState: Omit<Inscripciones, 'id' | 'fecha_modificacion'> = {
  nombre: '',
  telefono: '',
  correo: '',
  semestre: '',
  estado: false,
  medio_de_pago: '',
  asistencia: false,
  fecha_inscripcion: new Date(),
  curso_id: '',
};


const RegistrationForm = ({ curso_id }: InscripcionProps) => {
    const [formData, setFormData] = useState<Omit<Inscripciones, 'id' | 'fecha_modificacion'>>(initialRegistrationState);


  const { createInscripcion, loading } = useCreateInscripcion();
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
      navigate(-1);
    } else {
      console.error('Fallo en la inscripción desde el componente:', response);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="formContent">
      <form onSubmit={handleSubmit} className="form">
        <h2>Completa los campos</h2>
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
          placeholder="Selecciona Curso"
        />

        <div className="divider"></div>

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
            {loading ? 'Enviando...' : 'Inscribirse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
