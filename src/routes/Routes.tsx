import { Routes, Route } from 'react-router-dom';
import {
  Home,
  Admin,
  CreateCourse,
  CourseInscritos,
  Register,
  Registration,
} from '../pages';
import RoutesConfig from './RoutesConfig';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas principales */}
      <Route path={RoutesConfig.home} element={<Home />} />
      <Route path={RoutesConfig.register} element={<Register />} />
      <Route
        path={RoutesConfig.registration(':id')}
        element={<Registration />}
      />

      {/* Rutas administrativas */}
      <Route path={RoutesConfig.admin} element={<Admin />} />
      <Route path={RoutesConfig.createCourse} element={<CreateCourse />} />
      <Route
        path={RoutesConfig.courseInscritos(':id')}
        element={<CourseInscritos />}
      />
    </Routes>
  );
};

export default AppRoutes;
