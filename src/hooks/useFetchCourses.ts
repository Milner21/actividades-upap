import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { Curso as Course } from '../types/Course';

export const useFetchCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase.from('cursos').select('*');

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        // Mapear imagen_url a imagenUrl para que coincida con el tipo
        const mappedCourses = data.map((course) => ({
          ...course,
          imagenUrl: course.imagen_url,
          cupos: course.cupos_disponibles,
        }));
        setCourses(mappedCourses);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
