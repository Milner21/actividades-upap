import { useParams } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

function Registration() {
  const { id } = useParams();
  return (
    <div>
      <h1>Formulario de inscripción</h1>
      <RegistrationForm curso_id={String(id)} />
    </div>
  );
}

export default Registration;
