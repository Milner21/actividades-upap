/*
const Admin: React.FC = () => {
  const navigate = useNavigate();

  // Estados para el formulario
  const [nombre, setNombre] = useState('');
  const [cupos, setCupos] = useState(0);
  const [fecha, setFecha] = useState('');

  // Función para manejar la creación del curso
  const handleCrearCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || cupos <= 0 || !fecha) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const { error } = await supabase
      .from('cursos')
      .insert([{ nombre, cupos_disponibles: cupos, fecha }]);

    if (error) {
      alert('Error al crear el curso: ' + error.message);
    } else {
      alert('Curso creado con éxito');
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Crear Curso</h2>
      <form onSubmit={handleCrearCurso} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre del Curso:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Cupos Disponibles:</label>
          <input
            type="number"
            value={cupos}
            onChange={(e) => setCupos(parseInt(e.target.value, 10))}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Fecha de Realización:</label>
          <input
            type="datetime-local"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Crear Curso
        </button>
      </form>
    </div>
  );
};
*/

// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Cliente de Supabase
import { Link } from 'react-router-dom';
import { Curso } from '../types/Course'; // Interfaz Curso

const Admin = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    const fetchCursos = async () => {
      const { data, error } = await supabase.from('cursos').select('*');
      if (error) {
        console.error('Error al obtener los cursos:', error);
        return;
      }
      setCursos(data || []);
    };

    fetchCursos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Administración de Cursos</h1>

      <Link
        to="/admin/crear-curso"
        className="mb-4 inline-block text-white bg-green-500 py-2 px-4 rounded hover:bg-green-600"
      >
        Agregar Curso
      </Link>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Curso</th>
            <th className="border border-gray-300 px-4 py-2">
              Fecha de Realización
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Cupos Disponibles
            </th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id}>
              <td className="border border-gray-300 px-4 py-2">
                {curso.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {curso.fecha}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {curso.cupos}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/admin/course/${curso.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Ver Inscritos
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
