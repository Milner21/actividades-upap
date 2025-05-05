import { useState } from 'react';
import { inscripcionService } from '../services/inscripcionServices'

interface UseDeleteInscripcionReturn {
  deleteInscripcion: (inscripcionId: string | number) => Promise<boolean>;
  isDeleting: boolean;
  error: Error | null;
}

export function useDeleteInscripcion(): UseDeleteInscripcionReturn {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteInscripcion = async (inscripcionId: string | number): Promise<boolean> => {
    try {
      setIsDeleting(true);
      setError(null);

      // Usar el servicio para eliminar la inscripción
      const { success, error: deleteError } = await inscripcionService.deleteInscripcion(inscripcionId);

      if (!success) {
        throw new Error(deleteError || 'Error al eliminar la inscripción');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error en deleteInscripcion:', errorMessage);
      setError(err instanceof Error ? err : new Error(String(err)));
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    deleteInscripcion,
    isDeleting,
    error
  };
}