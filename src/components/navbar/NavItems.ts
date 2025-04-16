import RoutesConfig from "../../routes/RoutesConfig";

export const NavItems = [
    { name: 'Inicio', path: RoutesConfig.home },
    { name: 'Login', path: RoutesConfig.login },
  ];

export const NavItemsAdmin = [
  { name: 'Eventos', path: RoutesConfig.admin },
  { name: 'Crear Usuarios', path: RoutesConfig.registerUser },
]