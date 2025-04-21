import { useState, useEffect } from 'react';
import { getCourses } from '../services/courseServices';
import { Curso as Course } from '../types/Course';

export const useFetchCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
      setLoading(false);
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
