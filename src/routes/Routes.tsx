import { Routes, Route } from 'react-router-dom';
import {
  Home,
  CreateCourse,
  CourseInscritos,
  Register,
  Registration,
  Login,
  RegisterUser,
  CourseManager,
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
      <Route path={RoutesConfig.registerUser} element={<RegisterUser />} />

      {/* Rutas administrativas privadas */}
      <Route element={<PrivateRoute />}>
        <Route path={RoutesConfig.admin} element={<CourseManager />} />
        <Route path={RoutesConfig.createCourse} element={<CreateCourse />} />
        <Route
          path={RoutesConfig.courseInscritos(':id')}
          element={<CourseInscritos />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
