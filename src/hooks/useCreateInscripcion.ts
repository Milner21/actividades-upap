import { useState } from 'react';
import { toast } from 'react-toastify';
import { Inscripciones } from '../types/Course';
import { inscripcionService } from '../services/inscripcionServices';

export const useCreateInscripcion = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInscripcion = async (
    inscripcionData: Omit<Inscripciones, 'id'>,
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await inscripcionService.createInscripcion(inscripcionData);

      if (response.success) {
        setSuccess(true);
        toast.success('¡Inscripción exitosa!');
        return response;
      } else {
        setError(response.error || 'Error al inscribirse.');

        if (response.error?.includes('Ya estás inscrito')) {
          toast.warning(response.error);
        } else if (response.error?.includes('No hay cupos disponibles')) {
          toast.error(response.error);
        } else {
          toast.error(response.error || 'No se pudo completar la inscripción.');
        }
      }
    } catch (err: unknown) {
      console.error('Excepción en el hook useCreateInscripcion:', err);
      toast.error(`Error inesperado al procesar la inscripción: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { createInscripcion, loading, success, error };
};
