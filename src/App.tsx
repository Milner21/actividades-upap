import React from 'react';
import './App.css'; // Estilos generales de la aplicación
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Register from './pages/Register';
import CourseInscritos from './pages/CourseInscritos';
import { Footer, Navbar } from './components';
import { CreateCourse, Home } from './pages';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        draggable
        theme="colored"
      />
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sp/admin" element={<Admin />} />
            <Route path="/sp/admin/crear-curso" element={<CreateCourse />} />
            <Route path="/sp/admin/course/:id" element={<CourseInscritos />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
