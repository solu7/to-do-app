import "./navbar.css";
import logo from "../../core/assets/icons/logo.png";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-bar-brand">
      <img className="navbar-logo" src={logo} alt="Aplication Logo" />
      <p><span>todo</span>-app</p>
      </div>
      <div className="navbar-links">
        <Link>Inicio</Link>
        <Link>Sobre nosotros</Link>
        <Link>Contactanos</Link>
        <Link>Preguntas Frecuentes</Link>
        <Link>Planes</Link>
        <div className="navbar-auth-links">
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
