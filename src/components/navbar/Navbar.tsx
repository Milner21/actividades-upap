import { useState } from 'react';
import { navbarStyles as styles } from './styles';
import Sidebar from './Sidebar';
import NavLinks from './NavLinks';
import logo from '../../assets/logoUpap.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
        </div>

        <nav className={styles.desktopNav}>
          <NavLinks />
        </nav>

        <button className={styles.hamburger} onClick={() => setIsOpen(true)}>
          ☰
        </button>

        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </header>
  );
};

export default Navbar;
