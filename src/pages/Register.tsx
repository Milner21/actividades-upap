// src/pages/Register.tsx
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Asegúrate de importar el cliente de Supabase
import { useNavigate, useLocation } from 'react-router-dom';
import { Curso } from '../utils/Types';

const Register = () => {
  // Obtener los datos del curso desde la ubicación
  const location = useLocation();
  const { curso } = location.state as { curso: Curso }; // Especificamos el tipo aquí

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [semestre, setSemestre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  // Función para manejar el registro
  const handleInscripcion = async () => {
    if (!nombre || !correo || !semestre) {
      setMensaje('Todos los campos son obligatorios');
      return;
    }

    // Verificar si el usuario ya está inscrito en este curso
    const { data: inscripciones, error: checkError } = await supabase
      .from('inscripciones')
      .select('*')
      .eq('correo', correo)
      .eq('curso_id', curso.id);

    if (checkError) {
      setMensaje('Error al verificar inscripción: ' + checkError.message);
      return;
    }

    if (inscripciones.length > 0) {
      setMensaje('Ya estás inscrito en este curso');
      return;
    }

    // Insertar la inscripción en la base de datos
    const { error } = await supabase
      .from('inscripciones')
      .insert([{ curso_id: curso.id, nombre, correo, semestre }]);

    if (error) {
      setMensaje('Error al inscribirse: ' + error.message);
      return;
    }

    // Actualizar la cantidad de cupos disponibles
    const { error: updateError } = await supabase
      .from('cursos')
      .update({ cupos_disponibles: curso.cupos_disponibles - 1 })
      .eq('id', curso.id);

    if (updateError) {
      setMensaje('Error al actualizar los cupos: ' + updateError.message);
      return;
    }

    // Redirigir al inicio
    setMensaje('Inscripción exitosa');
    setTimeout(() => {
      navigate('/'); // Redirigir al inicio
    }, 2000);
  };

   // Función para regresar a la página anterior
   const handleRegresar = () => {
    navigate('/'); // Redirige a la página Home
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Formulario de Inscripción</h2>
      <p className="mb-4">Curso: {curso?.nombre}</p>
      <button
        type="button"
        onClick={handleRegresar} // Botón para regresar
        className="text-white bg-gray-500 py-2 px-4 rounded hover:bg-gray-600"
      >
        Regresar
      </button>
      <label className="block text-sm font-medium text-gray-700">Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <label className="block text-sm font-medium text-gray-700 mt-3">
        Correo:
      </label>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <label className="block text-sm font-medium text-gray-700 mt-3">
        Semestre:
      </label>
      <input
        type="text"
        value={semestre}
        onChange={(e) => setSemestre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <button
        onClick={handleInscripcion}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
      >
        Inscribirse
      </button>

      {mensaje && (
        <p className="mt-4 text-center text-sm text-gray-600">{mensaje}</p>
      )}
    </div>
  );
};

export default Register;
