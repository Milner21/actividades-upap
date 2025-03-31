// src/pages/CreateCourse.tsx
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Cliente de Supabase
import { useNavigate } from 'react-router-dom';

const CreateCourse = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [cupos, setCupos] = useState(0);
  const navigate = useNavigate();

  const handleCreateCourse = async () => {
    if (!nombre || !fecha || cupos <= 0) {
      alert('Por favor, complete todos los campos');
      return;
    }

    const { error } = await supabase.from('cursos').insert([
      {
        nombre,
        fecha_realizacion: fecha,
        cupos_disponibles: cupos,
      },
    ]);

    if (error) {
      console.error('Error al crear el curso:', error);
      return;
    }

    alert('Curso creado con éxito');
    navigate('/admin'); // Redirige a la página de administración después de crear el curso
  };

  // Función para regresar a la página anterior
  const handleRegresar = () => {
    navigate('/admin'); // Redirige a la página de administración
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Crear Curso</h2>
      <button
        type="button"
        onClick={handleRegresar} // Botón para regresar
        className="text-white bg-gray-500 py-2 px-4 rounded hover:bg-gray-600"
      >
        Regresar
      </button>
      <label className="block text-sm font-medium text-gray-700">
        Nombre del Curso:
      </label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <label className="block text-sm font-medium text-gray-700 mt-3">
        Fecha de Realización:
      </label>
      <input
        type="datetime-local"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <label className="block text-sm font-medium text-gray-700 mt-3">
        Cupos Disponibles:
      </label>
      <input
        type="number"
        value={cupos}
        onChange={(e) => setCupos(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded mt-1"
      />

      <button
        onClick={handleCreateCourse}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Crear Curso
      </button>
    </div>
  );
};

export default CreateCourse;
