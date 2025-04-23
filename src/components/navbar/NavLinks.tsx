import { navLinksStyles as styles } from './styles';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks';
import { NavItems, NavItemsAdmin } from './NavItems';

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

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
      {NavItems.map((item) =>
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
          {NavItemsAdmin.map((item) => (
            <li key={item.name}>
              <a href={item.path} onClick={isMobile ? closeMenu : undefined}>
                {item.name}
              </a>
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className={styles.btnCloseSession}>Cerrar sesión</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
