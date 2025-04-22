import { useEffect, useState } from 'react';
import { fetchRegistrationsInCourse } from '../services/inscripcionServices';

type Registration = {
  id: string;
  curso_id: string;
  nombre: string;
  telefono: string;
  correo: string;
  semestre: string;
  estado: boolean;
  medio_de_pago: string;
  asistencia: boolean;
  fecha_inscripcion: Date;
  fecha_modificacion?: Date;
};

export function useFetchRegistrationsInCourse(courseId: string | number) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null); // Corregido el tipo de error

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRegistrationsInCourse(courseId);
        // Transformar los datos para que coincidan con la estructura del estado
        const transformedData = data.map<Registration>((item) => ({
          id: String(item.id),
          curso_id: item.curso_id,
          nombre: item.nombre,
          telefono: item.telefono,
          correo: item.correo,
          semestre: item.semestre,
          estado: item.estado,
          medio_de_pago: item.medio_de_pago,
          asistencia: item.asistencia,
          fecha_inscripcion: item.fecha_inscripcion,
          fecha_modificacion: item.fecha_modificacion,
        }));
        setRegistrations(transformedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Se produjo un error desconocido'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return { registrations, loading, error };
}
