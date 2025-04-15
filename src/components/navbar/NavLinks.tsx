import {navLinksStyles as styles} from "./styles";

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

const navItems = [
  { name: "Inicio", path: "/" },
  { name: "Nosotros", path: "/" },
  { name: "Contactos", path: "/" },
];

const NavLinks = ({ isMobile, closeMenu }: NavLinksProps) => {
  return (
    <ul className={isMobile ? styles.navLinksMobile : styles.navLinks}>
      {navItems.map((item) => (
        <li key={item.name}>
          <a href={item.path} onClick={isMobile ? closeMenu : undefined}>
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
