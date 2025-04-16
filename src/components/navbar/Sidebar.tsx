import {sidebarStyles as styles} from './styles';
import NavLinks from './NavLinks';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const closeMenu = () => setIsOpen(false);
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
        ✖
      </button>
      <nav>
        <NavLinks isMobile closeMenu={closeMenu}/>
      </nav>
    </div>
  );
};

export default Sidebar;
