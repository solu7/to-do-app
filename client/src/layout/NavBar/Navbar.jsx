import "./navbar.css";
import { useState } from "react";
import logo from "../../core/assets/icons/logo.png";
import menuIcon from "../../core/assets/icons/menuIcon.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="navbar">
      <div className="navbar__header">
      <div className="navbar__brand">
        <img className="navbar__logo" src={logo} alt="Aplication Logo" />
        <p>
          <span>todo</span>-app
        </p>
      </div>
      <img
        src={menuIcon}
        alt="Icono de menu"
        className="menu-toggle"
        onClick={handleMenuToggle}
        aria-controls="navbar-menu"
        aria-expanded="isMenuOpen"
        role="button"
      />
      </div>
      <div
        className={`navbar__links ${isMenuOpen ? "active" : ""}`}
        id="navbar__menu"
      >
        <Link>Inicio</Link>
        <Link>Sobre mi</Link>
        <Link>Sobre el proyecto</Link>
        <Link>Iniciar como invitado</Link>
        <div className="navbar__auth-links">
          <Link to="/login">
            <button className="btn">Iniciar Sesion</button>
          </Link>
          <Link to="/register">
            <button className="btn-secondary">Registrarse</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
