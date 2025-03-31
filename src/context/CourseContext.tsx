import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definimos una interfaz para representar un curso
interface Course {
  id: string;
  nombre: string;
  cupos_disponibles: number;
}

// Definimos la interfaz para el contexto
interface CourseContextType {
  cursos: Course[]; // Array de cursos
  setCursos: React.Dispatch<React.SetStateAction<Course[]>>; // Función para actualizar los cursos
  inscribirCurso: (cursoId: string) => void; // Función para inscribir a un usuario en un curso
}

// Creamos el contexto con valor inicial undefined
const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Ahora especificamos que el tipo de `children` es ReactNode, que es cualquier contenido que pueda ir dentro de un componente React
interface CourseProviderProps {
  children: ReactNode;
}

// Creamos el proveedor del contexto
export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [cursos, setCursos] = useState<Course[]>([]); // Estado para almacenar los cursos

  // Función para inscribir a un usuario a un curso
  const inscribirCurso = (cursoId: string) => {
    // Actualizamos los cursos reduciendo los cupos disponibles
    setCursos((prevCursos) =>
      prevCursos.map((curso) =>
        curso.id === cursoId && curso.cupos_disponibles > 0
          ? { ...curso, cupos_disponibles: curso.cupos_disponibles - 1 }
          : curso
      )
    );
  };

  return (
    // Proveemos el contexto con el valor de los cursos y las funciones
    <CourseContext.Provider value={{ cursos, setCursos, inscribirCurso }}>
      {children}
    </CourseContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de los cursos
export const useCourseContext = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseContext debe ser usado dentro de CourseProvider');
  }
  return context;
};
