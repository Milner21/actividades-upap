import { Inscripciones } from '../types/Course';
import { supabase } from '../utils/supabaseClient';

export const inscripcionService = {
  async createInscripcion(data: {
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
  }) {
    try {
      const now = new Date();
      const utc03Date = new Date(now.getTime() - 3 * 60 * 60 * 1000);
      const { data: result, error } = await supabase.rpc(
        'registrar_inscripcion',
        {
          p_curso_id: data.curso_id,
          p_nombre: data.nombre,
          p_telefono: data.telefono,
          p_correo: data.correo,
          p_semestre: data.semestre,
          p_estado: false,
          p_medio_de_pago: 'transferencia',
          p_asistencia: false,
          p_fecha_inscripcion: utc03Date,
          p_fecha_modificacion: utc03Date,
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

export async function fetchRegistrationsInCourse(
  courseId: string | number,
): Promise<Inscripciones[]> {
  try {
    const { data, error } = await supabase
      .from('inscripciones')
      .select('*')
      .eq('curso_id', courseId);

    if (error) {
      throw new Error(
        'Error al obtener las inscripciones al evento: ' + error.message,
      );
    }

    return data as Inscripciones[];
  } catch (error) {
    console.error('Error en fetchCourseRegistrations:', error);
    throw error;
  }
}
