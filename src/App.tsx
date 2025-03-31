import React from 'react';
import './App.css'; // Estilos generales de la aplicación
import Home from './pages/Home'; // Importamos la página de inicio (Home)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Register from './pages/Register';
import CreateCourse from './pages/CreateCourse';
import CourseInscritos from './pages/CourseInscritos';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/create" element={<CreateCourse />} />
        <Route path="/admin/course/:id" element={<CourseInscritos />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
