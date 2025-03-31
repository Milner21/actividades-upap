// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient'; // Asegúrate de importar el cliente de Supabase
import { Link } from 'react-router-dom';
import { Curso } from '../utils/Types';

const Home = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);

  useEffect(() => {
    // Obtener los cursos disponibles
    const fetchCursos = async () => {
      const { data, error } = await supabase.from('cursos').select('*');
      if (error) {
        console.error('Error al obtener los cursos', error);
        return;
      }
      setCursos(data || []);
    };

    fetchCursos();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Cursos Disponibles</h1>
      <ul>
        {cursos.map((curso) => (
          <li key={curso.id} className="mb-4">
            <div className="border p-4 rounded shadow-md">
              <h3 className="text-xl font-semibold">{curso.nombre}</h3>
              <p>Cupos disponibles: {curso.cupos_disponibles}</p>

              {/* Redirigir al formulario de inscripción */}
              <Link
                to="/register"
                state={{ curso }} // Pasamos el curso seleccionado
                className="mt-2 inline-block text-white bg-blue-500 py-2 px-4 rounded hover:bg-blue-600"
              >
                Inscribirse
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
