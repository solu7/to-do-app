import "./AboutProject.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
import backendIcon from "./assets/images/backend.png";
import frontendIcon from "./assets/images/frontend.png";
import clientServerIcon from "./assets/images/client-server.png";
import funcionalityIcon from "./assets/images/functionality.png";
import questionIcon from "./assets/images/question.png";
import authIcon from "./assets/images/auth.png";
import inyectionIcon from "./assets/images/inyection.png";
import enviromentIcon from "./assets/images/enviroment.png";
import versionIcon from "./assets/images/version.png";
import securityIcon from "./assets/images/security.png";
import projectsIcon from "./assets/images/projects.png";
import uxIcon from "./assets/images/ux.png";
import optimizationIcon from "./assets/images/optimization.png";
import { useExternalNavigation } from "../../core/hooks/useExternalNavigation.js";

function AboutProject() {
  const { goToGitHubProject } = useExternalNavigation();
  return (
    <div className="about-project">
      <Navbar />
      <div className="about-project__heading">
        <h1>
          <span>To-Do</span> App
        </h1>
        <h4>
          Coded by <span>Agustin Salva.</span>
        </h4>
      </div>
      <section className="about-project__structure">
        <h2 className="about-project__section-title">
          Estructura del proyecto
        </h2>
        <section className="about-project__structure-content">
          <section className="about-project__structure-item">
            <section className="about-project__structure-item-heading">
              <h2 className="about-project__structure-title">
                Frontend: Módulos y Lógica
              </h2>
              <img
                className="about-project__structure-item-icon"
                src={frontendIcon}
                alt="Web design icon"
              />
            </section>
            <p className="about-project__structure-item-info">
              El cliente se organiza bajo dos principios clave para maximizar la
              reutilización de código y la separación de intereses.
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Arquitectura por Features:
                </p>
                <p className="about-project__structure-subItem-desc  theme-primary">
                  El código se organiza por funcionalidades (auth, tasks,
                  filters), asegurando que cada módulo sea independiente y fácil
                  de mantener.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Custom Hooks:
                </p>
                <p className="about-project__structure-subItem-desc  theme-secondary">
                  La lógica de negocio se aísla en Hooks Personalizados haciendo
                  que esta lógica sea completamente reutilizable a través de
                  diferentes componentes. Los componentes de UI se dedican solo
                  a la presentación visual, mejorando la legibilidad y
                  escalabilidad del Frontend.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Enrutamiento y formularios
                </p>
                <p className="about-project__structure-subItem-desc theme-primary">
                  Para la gestión de rutas se usa react-router-dom, y los
                  formularios y validaciones complejas se manejan con
                  react-hook-form junto a @hookform/resolvers.
                </p>
              </div>
            </section>
          </section>
          <section className="about-project__structure-item">
            <section className="about-project__structure-item-heading">
              <h2 className="about-project__structure-title">
                Modelo: Client-Server Distribuido
              </h2>
              <img
                className="about-project__structure-item-icon"
                src={clientServerIcon}
                alt="Client-server Icon"
              />
            </section>
            <p className="about-project__structure-item-info">
              La aplicación emplea un diseño Full-Stack modular, utilizando
              tecnologias como React, Node, Express y Mysql, proporcionándole
              una buena escalabilidad y separación de responsabilidades (SoC).
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Cliente / Frontend (React):
                </p>
                <p className="about-project__structure-subItem-desc theme-primary">
                  Se encarga de la UI y la presentación.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Servidor / Backend (Node/Express):
                </p>
                <p className="about-project__structure-subItem-desc theme-secondary">
                  Maneja la lógica de negocio, autenticación y base de datos.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Como se comunican
                </p>
                <p className="about-project__structure-subItem-desc theme-primary">
                  La comunicación entre ambos es puramente RESTful (peticiones
                  HTTP), con la autenticación de sesiones gestionada con JSON
                  Web Tokens (JWT). El código se divide en módulos por dominio
                  para simplificar el mantenimiento.
                </p>
              </div>
            </section>
          </section>
          <section className="about-project__structure-item">
            <section className="about-project__structure-item-heading">
              <h2 className="about-project__structure-title">
                Backend: Patrón MVC y Módulos
              </h2>
              <img
                className="about-project__structure-item-icon"
                src={backendIcon}
                alt="Server icon"
              />
            </section>
            <p className="about-project__structure-item-info">
              El servidor está estrictamente organizado mediante un Patrón MVC
              (Modelo-Vista-Controlador) implícito, con una división de código
              por dominio de negocio (auth, tasks, users, etc.).
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Rutas (.routes.js):
                </p>
                <p className="about-project__structure-subItem-desc theme-primary">
                  Definen los endpoints y aplican middlewares de seguridad.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Controladores (.controller.js):
                </p>
                <p className="about-project__structure-subItem-desc theme-secondary">
                  Encargados de la Lógica de Negocio y el manejo de la
                  petición/respuesta, como la validación inicial de datos y el
                  manejo de errores HTTP (ej. 409 Conflict).
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Modelos (.model.js):
                </p>
                <p className="about-project__structure-subItem-desc theme-primary">
                  Responsabilidad única de la capa de persistencia
                  (MySQL/PostgreSQL), donde se ejecutan todas las consultas SQL.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title">
                  Complementos y extras:
                </p>
                <p className="about-project__structure-subItem-desc theme-secondary">
                  Esta estructura se complementa con herramientas de seguridad
                  esenciales como bcrypt para hashing de contraseñas y
                  express-validator para la validación de inputs.
                </p>
              </div>
              <p></p>
            </section>
          </section>
        </section>
      </section>
      <hr />
      <section className="about-project__functionality">
        <section
          className="about-project__functionality-heading"
          style={{ gridArea: "title" }}
        >
          <div className="about-project__functionality-section-title">
            <h2>Funcionalidad y lógica de negocio</h2>
            <img
              className="about-project__functionality-section-title-icon"
              src={funcionalityIcon}
              alt="Funcionality icon"
            />
          </div>

          <div className="about-project__functionality-heading-extra">
            <p className="about-project__functionality-question">
              Aqui va una pregunta?
            </p>
            <img
              className="about-project-functionality-question-icon"
              src={questionIcon}
              alt="Question icon"
            />
          </div>
        </section>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item2" }}
        >
          <h2 className="about-project__funcionality-title">
            Gestión Total de Recursos (CRUD Completo)
          </h2>

          <p className="about-project__funcionality-desc">
            La aplicación ofrece operaciones CRUD para todos sus elementos
            principales: Tareas, Tags, Categorías y Usuarios. El usuario puede
            manipular y editar estos elementos en tiempo real desde el panel de
            control.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item3" }}
        >
          <h2 className="about-project__funcionality-title">
            Modelado Relacional N:M y Robustez de IDs
          </h2>
          <p className="about-project__funcionality-desc">
            El sistema gestiona relaciones Muchos-a-Muchos (N:M) usando tablas
            pivote. Tambien se utiliza nanoid para generar IDs alfanuméricos
            únicos en lugar de IDs autoincrementales, lo que mejora la robustez.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item4" }}
        >
          <h2 className="about-project__funcionality-title">
            Filtrado Dinámico de Consultas SQL
          </h2>
          <p className="about-project__funcionality-desc">
            Se construye la consulta SQL dinámicamente con diversos parámetros.
            Para un filtrado eficiente basado en múltiples Tags o Categorías, se
            emplean las cláusulas LEFT JOIN y HAVING junto con FIND_IN_SET.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item5" }}
        >
          <h2 className="about-project__funcionality-title">
            Flujos de Trabajo Inteligentes
          </h2>
          <p className="about-project__funcionality-desc">
            El Dashboard centraliza la gestión de tareas clave, organizándolas
            por estado y fecha para guiar la navegación. Esto incluye la bandeja
            Inbox (para tareas rápidas) y las secciones "Today" y "Upcoming" ,
            lo que facilita el flujo de trabajo.
          </p>
        </div>
      </section>
      <hr />
      <section className="about-project__security">
        <div className="about-project__security-section-title">
          <h2>
            <span>Seguridad</span> y Buenas Prácticas
          </h2>
          <img
            className="about-project__security-section-title-icon"
            src={securityIcon}
            alt="Security icon"
          />
        </div>
        <section className="about-project__security-content">
          <div className="about-project__security-item">
            <img
              className="about-project__security-item-icon"
              src={authIcon}
              alt="Auth icon"
            />
            <h2 className="about-project__security-item-title">
              Autenticación y Cookies
            </h2>
            <p className="about-project__security-item-info">
              El sistema de autenticación utiliza JSON Web Tokens (JWT) y
              maximiza la seguridad con tres medidas clave:
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Almacenamiento en cookies HttpOnly. Para mitigar el riesgo de
                Cross-Site Scripting (XSS).
              </li>
              <li>
                Configuración SameSite=Strict en las cookies, protegiendo contra
                la mayoría de los ataques Cross-Site Request Forgery (CSRF).
              </li>
              <li>
                Uso de la libreria bcrypt para el hashing de las contraseñas.
              </li>
            </ul>
          </div>
          <div className="about-project__security-item">
            <img
              className="about-project__security-item-icon"
              src={inyectionIcon}
              alt="SQL Inyection icon"
            />
            <h2 className="about-project__security-item-title">
              Prevención de Ataques de Inyección
            </h2>
            <p className="about-project__security-item-info">
              La API se protege de vulnerabilidades comunes mediante una defensa
              de múltiples capas:
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Todas las interacciones con la base de datos se realizan
                exclusivamente con Consultas Parametrizadas. Esto permite que
                los inputs del usuario se traten como datos y no como comandos
                SQL, previniendo la inyección SQL.
              </li>
              <li>
                Uso de express-validator para aplicar un esquema de validación
                de inputs, asegurando la integridad y el formato de los datos.
              </li>
            </ul>
          </div>
          <div className="about-project__security-item">
            <img
              className="about-project__security-item-icon"
              src={enviromentIcon}
              alt="Development enviroment icon"
            />
            <h2 className="about-project__security-item-title">
              Gestión de Entorno y CORS
            </h2>
            <p className="about-project__security-item-info">
              Se implementó una configuración de entorno profesional para la
              gestión de secretos:
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Todas las variables sensibles (claves de JWT, credenciales de
                DB) se gestionan con dotenv y se excluyen del repositorio
                público con .gitignore.
              </li>
              <li>
                Las políticas CORS se restringen explícitamente al origen de
                desarrollo (localhost), evitando peticiones maliciosas de otros
                dominios.
              </li>
            </ul>
          </div>
          <div className="about-project__security-item">
            <img
              className="about-project__security-item-icon"
              src={versionIcon}
              alt="Version control icon"
            />
            <h2 className="about-project__security-item-title">
              Mantenibilidad y Control de Versiones
            </h2>
            <p className="about-project__security-item-info">
              Se aplica una filosofía de desarrollo para la alta mantenibilidad
              y colaboración:
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Separación de Intereses (SoC): Estructura estricta de MVC
                modular en el Backend y separación de Lógica/Vista en el
                Frontend.
              </li>
              <li>
                Control de Versiones: Uso disciplinado de Git con ramas por
                feature y mensajes de commit estandarizados para un historial
                limpio.
              </li>
            </ul>
          </div>
        </section>
      </section>
      <hr />
      <section className="about-project__resources">
        <section className="about-project__resources-links">
          <h2
            className="about-project__section-title"
            style={{ gridArea: "title" }}
          >
            Código Fuente y Recursos
          </h2>
          <div
            className="about-project__resources-links-item"
            style={{ gridArea: "box1" }}
          >
            <p className="about-project__links-item-title">
              Repositorio Público:
            </p>
            <div className="about-project__resources-item-info">
              <p className="about-project__links-item-paragraph">
                El proyecto completo está disponible en GitHub.
              </p>
              <button
                onClick={goToGitHubProject}
                className="about-project__links-button btn"
              >
                Aqui
              </button>
            </div>
          </div>
          <div
            className="about-project__resources-links-item"
            style={{ gridArea: "box2" }}
          >
            <p className="about-project__links-item-title">Demo</p>
            <div className="about-project__resources-item-info">
              <p className="about-project__links-item-paragraph">
                Este proyecto está diseñado para ser desplegado en un entorno de
                producción.
              </p>
              <button className="about-project__links-button btn">Aqui</button>
              <p className="success-message">
                Todavia no a sido desplegado en la web.
              </p>
            </div>
          </div>
        </section>
        <section className="about-project__expansion">
          <h2 className="about-project__section-title">Visión futura</h2>
          <div className="bar-line"></div>
          <div className="about-project__expansion-content">
            <div className="about-project__expansion-item">
              <section className="about-project__expansion-item-heading">
                <img
                  className="about-project__expansion-item-icon"
                  src={projectsIcon}
                  alt="Projects icon"
                />
                <p className="about-project__expansion-item-title">
                  Sistema de <span>proyectos</span>
                </p>
              </section>
              <p className="about-project__expansion-item-desc">
                Implementación de entornos de "Proyectos" separados. Esto
                permitirá agrupar tareas bajo contextos específicos, ofreciendo
                un nivel superior de organización al usuario.
              </p>
            </div>
            <div className="about-project__expansion-item">
              <section className="about-project__expansion-item-heading">
                <img
                  className="about-project__expansion-item-icon"
                  src={uxIcon}
                  alt="UX Icon"
                />
                <p className="about-project__expansion-item-title">
                  Vistas <span>Dinámicas</span>
                </p>
              </section>
              <p className="about-project__expansion-item-desc">
                Desarrollo de una Vista de Panel para las secciones que incluyen
                tareas. Esto le brinda al usuario a un flujo visual mucho mas
                intuitivo, mejorando la gestión y el manejo del proyecto.
              </p>
            </div>
            <div className="about-project__expansion-item">
              <section className="about-project__expansion-item-heading">
                <img
                  className="about-project__expansion-item-icon"
                  src={optimizationIcon}
                  alt="Optimization icon"
                />
                <p className="about-project__expansion-item-title">
                  Refactorización y <span>Rendimiento</span>
                </p>
              </section>
              <p className="about-project__expansion-item-desc">
                Continuar refactorizando código para mejorar la legibilidad.
                Ademas de optimización del rendimiento de la aplicación, para
                tiempos de carga y respuesta más rápidos.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
export default AboutProject;
