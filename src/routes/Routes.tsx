import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Register,
  Registration,
  Login,
  RegisterUser,
  CourseManager,
  CourseCreate,
  CourseRegistrationManager,
  RegistrationManager,
} from '../pages';
import RoutesConfig from './RoutesConfig';
import { PrivateRoute } from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path={RoutesConfig.home} element={<Home />} />
      <Route path={RoutesConfig.register} element={<Register />} />
      <Route
        path={RoutesConfig.registration(':id')}
        element={<Registration />}
      />
      <Route path={RoutesConfig.login} element={<Login />} />
      

      {/* Rutas administrativas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path={RoutesConfig.admin} element={<CourseManager />} />
        <Route path={RoutesConfig.createCourse} element={<CourseCreate />} />
        <Route
          path={RoutesConfig.courseInscritos(':id')}
          element={<CourseRegistrationManager />}
        />
        <Route path={RoutesConfig.registerUser} element={<RegisterUser />} />
        <Route path={RoutesConfig.registrationList} element={<RegistrationManager />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
