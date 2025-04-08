import { supabase } from '../utils/supabaseClient';

/**
 * Sube un archivo al bucket de Supabase Storage.
 * @param file - Archivo a subir (de tipo File).
 * @returns La URL pública del archivo subido.
 */
export const uploadImageToStorage = async (file: File): Promise<string> => {
  try {
    // Obtener la extensión del archivo
    const fileExt = file.name.split('.').pop();
    // Crear un nombre único basado en timestamp
    const filePath = `cursos/${Date.now()}.${fileExt}`;

    // Subir el archivo al bucket
    const { data, error } = await supabase.storage
      .from('actividades-images')
      .upload(filePath, file);

    if (error) {
      console.error('Storage Error:', error);
      throw new Error('Error al subir la imagen: ' + error.message);
    }

    // Verificar si el archivo se subió correctamente
    if (!data || !data.path) {
      throw new Error(
        'La respuesta de Supabase no contiene información de la ruta del archivo.',
      );
    }

    // Obtener la URL pública del archivo
    const publicUrlData = supabase.storage
      .from('actividades-images')
      .getPublicUrl(data.path);

    return publicUrlData.data.publicUrl;
  } catch (error) {
    console.error('Error en uploadImageToStorage:', error);
    // Convertir error a tipo Error para acceder a sus propiedades correctamente
    throw new Error((error as Error).message);
  }
};
