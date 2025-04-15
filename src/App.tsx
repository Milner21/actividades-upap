import React from 'react';
import './App.css'; // Estilos generales de la aplicación
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { ToastContainer } from 'react-toastify';
import AppRoutes from './routes/Routes';

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
          <AppRoutes/>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
