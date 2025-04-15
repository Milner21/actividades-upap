const basePaths = {
    admin: "/sp/admin", 
  };
  
  const RoutesConfig = {
    // Rutas principales
    home: "/",
    register: "/register",
    registration: (id: string) => `/registration/${id}`,
  
    // Rutas administrativas usando el prefijo dinámico
    admin: basePaths.admin, 
    createCourse: `${basePaths.admin}/crear-curso`,
    courseInscritos: (id: string) => `${basePaths.admin}/course/${id}`, 
  };
  
  export default RoutesConfig;