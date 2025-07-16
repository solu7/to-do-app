import "./navbar.css";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <img className="navbar-logo" src={logo} alt="Aplication Logo" />
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/about">Sobre nosotros</Link>
        <Link to="/contact">Contactanos</Link>
        <Link to="/frequentQuest">Preguntas Frecuentes</Link>
        <Link to="/planes">Planes</Link>
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
