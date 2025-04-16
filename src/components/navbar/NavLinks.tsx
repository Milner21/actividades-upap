import { navLinksStyles as styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks';

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

const navItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Login', path: '/login' },
];

const NavLinks = ({ isMobile, closeMenu }: NavLinksProps) => {
  const { user } = useAuth();
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      toast.info('Sesión cerrada con éxito.');
      setTimeout(() => {
        navigate('/');
        closeMenu?.();
      }, 50);
    }
  };

  return (
    <ul className={isMobile ? styles.navLinksMobile : styles.navLinks}>
      {navItems.map((item) =>
        user && item.name === 'Login' ? null : (
          <li key={item.name}>
            <a href={item.path} onClick={isMobile ? closeMenu : undefined}>
              {item.name}
            </a>
          </li>
        ),
      )}
      {user && (
        <>
          <a href="/sp/admin" onClick={isMobile ? closeMenu : undefined}>
            Administracion
          </a>
          <li>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
