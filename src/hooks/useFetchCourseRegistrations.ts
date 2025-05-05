import { useState, useEffect, useCallback } from 'react';
import { Inscripciones } from '../types/Course';
import { fetchRegistrationsInCourse } from '../services/inscripcionServices';

interface UseFetchRegistrationsInCourseReturn {
  registrations: Inscripciones[];
  loading: boolean;
  error: Error | null;
  refreshRegistrations: () => Promise<void>;
}

export function useFetchRegistrationsInCourse(courseId: string): UseFetchRegistrationsInCourseReturn {
  const [registrations, setRegistrations] = useState<Inscripciones[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRegistrationsInCourse(courseId);
      setRegistrations(data);
    } catch (err) {
      console.error('Error al obtener inscripciones:', err);
      setError(err instanceof Error ? err : new Error('Error al cargar inscripciones'));
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  // Función para actualizar los datos
  const refreshRegistrations = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Cargar datos inicialmente
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { registrations, loading, error, refreshRegistrations };
}