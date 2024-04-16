import './Navbar.css';

interface NavbarProps {
  // Tutaj można zdefiniować propsy, jeśli są potrzebne
}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <ul className="navbar-menu">
        <li className="navbar-item">Home</li>
        <li className="navbar-item">About</li>
        <li className="navbar-item">Contact</li>
      </ul>
    </nav>
  );
}

export default Navbar;