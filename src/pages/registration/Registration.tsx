import { useParams } from 'react-router-dom';
import { InscripcionForm } from '../../components';

function Registration() {
  const { id } = useParams();
  return (
    <div>
      <h1>Formulario de inscripción</h1>
      <InscripcionForm curso_id={String(id)} />
    </div>
  );
}

export default Registration;
