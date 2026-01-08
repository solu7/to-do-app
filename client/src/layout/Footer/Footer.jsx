import "./Footer.css";
import userIcon from "../../core/assets/icons/logo.png";
import featuresIcon from "./assets/images/features.png";
import aboutmeIcon from "./assets/images/aboutme.png";
import contactIcon from "./assets/images/contact.png";
import resourcesIcon from "./assets/images/resources.png";
import phoneIcon from "./assets/images/phone.png";
import emailIcon from "./assets/images/email.png";
import githubIcon from "./assets/images/github.png";
import linkedinIcon from "./assets/images/linkedin.png";
import moreproyectsIcon from "./assets/images/moreproyects.png";
import downloadIcon from "./assets/images/download.png";
import documentationIcon from "./assets/images/documentation.png";
import seecodeIcon from "./assets/images/seecode.png";
import { useNavigation } from "../../core/hooks/useNavigation";
import { useExternalNavigation } from "../../core/hooks/useExternalNavigation";

function Footer() {
  const { goToAboutMe } = useNavigation();
  const { goToGitHubProfile, goToLinkedIn, goToGitHubRepos } = useExternalNavigation();
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
      </div>
      <div className="footer-section footer-section-features">
        <section className="footer-section-header footer-features-section-header">
          <p className="footer-list-title features">Caracteristicas</p>
          <img
            className="footer-section-header-icon"
            src={featuresIcon}
            alt="Features Icon"
          />
        </section>
        <ul className="footer-list footer-list-features">
          <li>Crear, editar y eliminar tareas (CRUD)</li>
          <li>Establecer categorias y tags</li>
          <li>Diferentes tipo de filtrado de tareas</li>
          <li>Autenticacion de usuario (JWT/Sesión)</li>
          <li>Validaciones de datos (Back & Front)</li>
        </ul>
      </div>

      <div className="footer-section footer-about-section">
        <section className="footer-section-header footer-about-section-header">
          <p className="footer-list-title footer-about-list-title">
            Acerca de mi
          </p>
          <img
            className="footer-section-header-icon"
            src={aboutmeIcon}
            alt="About me Icon"
          />
        </section>
        <ul className="footer-list footer-about-list">
          <li onClick={goToAboutMe}>Acerca del desarrolador</li>
          <li
            className="footer-list-item footer-about-list-item"
            onClick={goToGitHubRepos}
          >
            Otros proyectos
            <img
              className="list-item-icon"
              src={moreproyectsIcon}
              alt="More proyects icon"
            />
          </li>
          <li className="footer-list-item footer-about-list-item">
            Descargar CV
            <img
              className="list-item-icon"
              src={downloadIcon}
              alt="Download icon"
            />
          </li>
        </ul>
      </div>

      <div className="footer-section footer-contact-section">
        <section className="footer-section-header footer--contact-section-header">
          <p className="footer-list-title footer-contact-list-title">
            Contacto
          </p>
          <img
            className="footer-section-header-icon"
            src={contactIcon}
            alt="Contact Icon"
          />
        </section>
        <ul className="footer-list footer-list-contact">
          <li className="footer-list-item footer-contact-list-item">
            +54 387 6136 086
            <img className="list-item-icon" src={phoneIcon} alt="Phone Icon" />
          </li>
          <li className="footer-list-item footer-contact-list-item">
            salvaagustin03@gmail.com
            <img className="list-item-icon" src={emailIcon} alt="Email Icon" />
          </li>
        </ul>
        <p className="footer-list-title footer-social-list-title">Redes</p>
        <ul className="footer-list footer-social-list">
          <li className="footer-list-item footer-contact-list-item" onClick={goToGitHubProfile}>
            GitHub
            <img
              className="list-item-icon"
              src={githubIcon}
              alt="Github Icon"
            />
          </li>
          <li className="footer-list-item footer-contact-list-item" onClick={goToLinkedIn}>
            LinkedIn
            <img
              className="list-item-icon"
              src={linkedinIcon}
              alt="LinkedIn Icon"
            />
          </li>
        </ul>
      </div>
      <p className="codedBy">To-do App coded by: Solu</p>
    </footer>
  );
}

export default Footer;
