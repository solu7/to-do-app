import "./navbar.css";
import { useState } from "react";
import logo from "../../core/assets/icons/logo.png";
import menuIcon from "../../core/assets/icons/menuIcon.png";
import { Link } from "react-router-dom";
import { loginAsGuest } from "../../features/auth/Login/loginService";
import { useNavigation } from "../../core/hooks/useNavigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { goToDashboard } = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  const handleGuestLogin = async () => {
    if (isLoggingIn) return;

    setIsLoggingIn(true);
    setError(null);

    try {
      await loginAsGuest();
      goToDashboard();
    } catch (err) {
      setError(err.message);
      console.error("Error al iniciar como invitado:", err);
    } finally {
      setIsLoggingIn(false);
    }
  };
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
        <Link to="/">Inicio</Link>
        <Link to="/about-me">Sobre mi</Link>
        <Link to="/about-proyect">Sobre el proyecto</Link>
        <Link onClick={handleGuestLogin} disabled={isLoggingIn}>
          {isLoggingIn ? "Iniciando..." : "Iniciar como invitado"}
        </Link>
        <div className="navbar__auth-links">
          <Link to="/login">
            <button className="btn">Iniciar Sesion</button>
          </Link>
          <Link to="/register">
            <button className="btn-secondary">Registrarse</button>
          </Link>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </nav>
  );
}

export default Navbar;
