// src/pages/CourseInscritos.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Cliente de Supabase
import { useParams, useNavigate } from 'react-router-dom';
import { Inscrito } from '../utils/Types';

const CourseInscritos = () => {
  const [inscritos, setInscritos] = useState<Inscrito[]>([]); // Usamos el tipo Inscrito en el estado;
  const { id } = useParams(); // Obtenemos el ID del curso desde la URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInscritos = async () => {
      const { data, error } = await supabase
        .from('inscripciones')
        .select('*')
        .eq('curso_id', id);

      if (error) {
        console.error('Error al obtener los inscritos:', error);
        return;
      }

      setInscritos(data || []);
    };

    fetchInscritos();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Inscritos en el Curso</h1>

      <button
        onClick={() => navigate('/admin')} // Regresar a la página de administración
        className="mb-4 inline-block text-white bg-gray-500 py-2 px-4 rounded hover:bg-gray-600"
      >
        Regresar
      </button>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Correo</th>
            <th className="border border-gray-300 px-4 py-2">Semestre</th>
          </tr>
        </thead>
        <tbody>
          {inscritos.map((inscrito) => (
            <tr key={inscrito.id}>
              <td className="border border-gray-300 px-4 py-2">
                {inscrito.nombre}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {inscrito.correo}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {inscrito.semestre}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseInscritos;
