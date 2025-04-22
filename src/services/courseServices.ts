import { supabase } from '../utils/supabaseClient';
import { Curso as CourseFormData } from '../types/Course';

export const createCourseInDB = async (
  formData: CourseFormData
) => {
  try {

    // 🚀 Ahora creamos el curso con la URL de imagen correcta
    const { data: course, error: insertError } = await supabase
      .from('cursos')
      .insert([
        {
          nombre: formData.nombre,
          cupos_disponibles: formData.cupos,
          fecha: formData.fecha,
          hora: formData.hora,
          imagen_url: formData.imagenUrl,
          estado: "true",
        },
      ])
      .select('id') // Obtener el ID del curso insertado
      .single();

    if (insertError) {
      throw new Error(
        'Error al insertar curso en la base de datos: ' + insertError.message,
      );
    }

    return course; // Retornar el curso insertado
  } catch (error) {
    console.error('Error en createCourseInDB:', error);
    throw error; // Relanzar el error para manejarlo en un nivel superior
  }
};

export const getCourses = async (): Promise<CourseFormData[]> => {
  const { data, error } = await supabase.from('cursos').select('*');

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  // Mapear imagen_url a imagenUrl para que coincida con el tipo
  return data.map((course) => ({
    ...course,
    imagenUrl: course.imagen_url,
    cupos: course.cupos_disponibles,
  }));
};

