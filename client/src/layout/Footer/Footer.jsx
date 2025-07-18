import "./Footer.css";
import userIcon from "./assets/images/userIcon.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-about-project">
        <div className="footer-header">
          <img
            className="footer-user-icon"
            src={userIcon}
            alt="Icono de usuario"
          />
          <h2 className="footer-header-title">
            to-do<span> App</span>
          </h2>
        </div>
        <p className="footer-project-description">
          ToDoApp fue desarrollada como proyecto personal con fines educativos y
          de portafolio. Los usuarios pueden registrarse, iniciar sesión y
          organizar tareas mediante etiquetas personalizadas, categorías y
          filtros.
        </p>
        <div className="footer-learned">
          <p className="footer-list-title learned">
            ¿Que aprendi con el desarrollo de esta <span>app</span>?
          </p>
          <div className="footer-list learned">
            <ul>
            <li>Diseñar e implementar una API RESTful</li>
            <li>Autenticar seguramente un usuario</li>
            <li>Diseñar de una base de datos relacional escalable</li>
            <li>
              Armar una buena arquitectura de carpetas y estructura de codigo
            </li>
            </ul>
            <ul>
            <li>Como documentar una API</li>
            <li>Implementar seguridad y validación de datos</li>
            <li>Desplegar mis proyectos en la web</li>
            <li>Me familiarize mas con el testing e2e</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-section features">
        <p className="footer-list-title features">Caracteristicas</p>
        <ul className="footer-list features">
          <li>Crear, editar y eliminar tareas</li>
          <li>Establecer categorias y tags</li>
          <li>Filtrar tareas de distintas formas</li>
          <li>Autenticacion de usuario</li>
          <li>Validaciones de datos</li>
        </ul>
      </div>

      <div className="footer-section about-me">
        <p className="footer-list-title about-me">Acerca de mi</p>
        <ul className="footer-list about-me">
          <li>Acerca del desarrolador</li>
          <li>Otros proyectos.</li>
          <li>Portafolio</li>
          <li>Descargar CV</li>
        </ul>
      </div>

      <div className="footer-section contact">
        <p className="footer-list-title contact">Contacto</p>
        <ul className="footer-list contact">
          <li>+54 387 6136 086</li>
          <li>salvaagustin03@gmail.com</li>
        </ul>
        <p className="footer-list-title social">Redes</p>
        <ul className="footer-list social">
          <li>GitHub</li>
          <li>LinkedIn</li>
        </ul>
      </div>

      <div className="footer-section more-info">
        <p className="footer-list-title more-Info">
          Mas sobre este proyecto.
        </p>
        <ul className="footer-list more-info">
          <li>Documentacion API</li>
          <li>Repositorio de Git Hub</li>
          <li>Preguntas Frecuentes</li>
        </ul>
      </div>
      <p className="codedBy">To-do App coded by: Solu</p>
    </footer>
  );
}

export default Footer;
