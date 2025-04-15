import { supabase } from '../utils/supabaseClient';

export const inscripcionService = {
  async createInscripcion(data: {
    curso_id: string;
    nombre: string;
    telefono: string;
    correo: string;
    semestre: string;
  }) {
    try {
      const { data: result, error } = await supabase.rpc(
        'registrar_inscripcion',
        {
          p_curso_id: data.curso_id,
          p_nombre: data.nombre,
          p_telefono: data.telefono,
          p_correo: data.correo,
          p_semestre: data.semestre,
        },
      );

      if (error) {
        console.error('Error de Supabase:', error.message);
        return { success: false, error: error.message };
      }

      // result puede ser: 'Ya estás inscrito...', 'No hay cupos...', o 'Inscripción exitosa.'
      if (typeof result === 'string' && result !== 'Inscripción exitosa.') {
        return { success: false, error: result };
      }

      return { success: true, data: result };
    } catch (error: unknown) {
      console.error('Error en inscripcionService:', error);
      return { success: false, error: 'Error al inscribirse.' };
    }
  },
};
