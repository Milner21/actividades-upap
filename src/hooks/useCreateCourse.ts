import { useState } from 'react';
import { createCourseInDB } from '../services/courseServices'; // Servicio que inserta el curso en la DB
import { uploadImageToStorage } from '../services/storageServices'; // Servicio que sube la imagen al Storage
import { Curso as CourseFormData } from '../types/Course'; // Tipo definido para el curso
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import RoutesConfig from '../routes/RoutesConfig';


const useCreateCourse = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const createCourse = async (
    formData: CourseFormData,
    selectedImage: File | null,
  ) => {
    setLoading(true);
    try {
      // Definir una imagen predeterminada
      const defaultImagePath = 'default';

      // Si se proporciona una imagen, subirla a Supabase Storage y obtener la URL pública
      const imageUrl = selectedImage
        ? await uploadImageToStorage(selectedImage)
        : defaultImagePath;

      // Enviar los datos del curso a la base de datos, incluyendo la URL de la imagen
      await createCourseInDB({ ...formData, imagenUrl: imageUrl });

      toast.success('Curso creado con éxito 🎉');
      navigate(RoutesConfig.admin);

    } catch (error) {
      console.error('Error al crear el curso:', error);
      toast.error('Hubo un error al crear el curso, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return { createCourse, loading };
};

export default useCreateCourse;
