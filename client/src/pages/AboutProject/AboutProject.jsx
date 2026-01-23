import "./AboutProject.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
import backendIcon from "./assets/images/backend.png";
import frontendIcon from "./assets/images/frontend.png";
import structureIcon from "./assets/images/structure.png";
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
import documentationIcon from "./assets/images/documentation.png";
import deploymentIcon from "./assets/images/deployment.png";
import githubIcon from "./assets/images/github.png";
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
              <img
                className="about-project__structure-item-icon"
                src={frontendIcon}
                alt="Web design icon"
              />
              <h2 className="about-project__structure-title">
                Frontend: Arquitectura y UI:
              </h2>
            </section>
            <p className="about-project__structure-item-info theme-secondary">
              El cliente está desarrollado con React y se organiza bajo
              principios de modularidad para facilitar la reutilización de
              código y la separación de intereses.
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Arquitectura por Features:
                </p>
                <p className="about-project__structure-subItem-desc">
                  El código se organiza por funcionalidades (auth, tasks,
                  filters), asegurando que cada módulo sea independiente y fácil
                  de localizar.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Custom Hooks:
                </p>
                <p className="about-project__structure-subItem-desc ">
                  La lógica de negocio se aísla en hooks personalizados,
                  permitiendo que los componentes de UI se dediquen
                  exclusivamente a la presentación visual.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Gestión de Estado Nativa:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Se utiliza Context API y hooks nativos para el manejo de
                  estados globales, priorizando las herramientas fundamentales
                  de React antes de introducir librerías externas
                </p>
              </div>
            </section>
          </section>
          <section className="about-project__structure-item">
            <section className="about-project__structure-item-heading">
              <img
                className="about-project__structure-item-icon"
                src={structureIcon}
                alt="Structure Icon"
              />
              <h2 className="about-project__structure-title">
                Integración y Flujo de Datos
              </h2>
            </section>
            <p className="about-project__structure-item-info theme-secondary">
              La aplicación emplea un diseño Full-Stack donde la comunicación
              entre el cliente y el servidor es el eje central para la
              persistencia y seguridad de los datos.
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  API RESTful:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Integración fluida mediante Fetch API nativo para el manejo de
                  peticiones asíncronas, priorizando el dominio de las
                  interfaces estándar del navegador.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Seguridad con JWT:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Implementación de autenticación basada en JSON Web Tokens,
                  gestionando el acceso a rutas protegidas y la identidad del
                  usuario de forma segura.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Validación Estricta:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Uso de React Hook Form en el frontend y validadores en el
                  servidor para asegurar que la información cumpla con el
                  formato requerido antes de ser procesada.
                </p>
              </div>
            </section>
          </section>
          <section className="about-project__structure-item">
            <section className="about-project__structure-item-heading">
              <img
                className="about-project__structure-item-icon"
                src={backendIcon}
                alt="Server icon"
              />
              <h2 className="about-project__structure-title">
                Backend: Infraestructura y API:
              </h2>
            </section>
            <p className="about-project__structure-item-info theme-secondary">
              El servidor está construido con Node.js y Express, siguiendo una
              estructura de capas clara que divide las responsabilidades desde
              la ruta hasta la base de datos.
            </p>
            <section className="about-project__structure-item-main-content">
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Arquitectura MVC:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Organización basada en Routes, Controllers y Models,
                  asegurando que cada componente tenga una responsabilidad
                  única, garantizando la escalabilidad y el mantenimiento del
                  lado del servidor.
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Persistencia en SQL Nativo:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Interacción directa con MySQL/PostgreSQL mediante consultas
                  SQL puras, demostrando el manejo del lenguaje de bases de
                  datos sin abstracciones intermedias (ORMs).
                </p>
              </div>
              <div className="about-project__structure-subItem">
                <p className="about-project__structure-subItem-title theme-primary">
                  Seguridad en el Servidor:
                </p>
                <p className="about-project__structure-subItem-desc">
                  Implementación de bcrypt para el hashing de contraseñas y
                  middlewares de seguridad para proteger los endpoints de la
                  API.
                </p>
              </div>
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
            <h2>Lógica de Negocio y Gestión de Datos</h2>
            <img
              className="about-project__functionality-section-title-icon"
              src={funcionalityIcon}
              alt="Funcionality icon"
            />
          </div>

          <div className="about-project__functionality-heading-extra">
            <p className="about-project__functionality-question">
              ¿Qué hay detrás del código?
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
            Seguridad por Niveles (JWT):
          </h2>

          <p className="about-project__funcionality-desc">
            Uso de middlewares especializados para validar tokens en cookies,
            diferenciando entre acceso robusto a perfil, validación ligera para
            tareas y gestión de sesiones extendidas (Refresh Tokens).
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item3" }}
        >
          <h2 className="about-project__funcionality-title">
            Transacciones Atómicas:
          </h2>
          <p className="about-project__funcionality-desc">
            Procesos críticos (como el registro) envueltos en bloques
            Commit/Rollback, garantizando que la base de datos nunca quede en un
            estado inconsistente si ocurre un error.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item4" }}
        >
          <h2 className="about-project__funcionality-title">
            Estrategia de Onboarding:
          </h2>
          <p className="about-project__funcionality-desc">
            Sistema de inicialización que genera automáticamente categorías,
            etiquetas y tareas de ejemplo para nuevos usuarios, asegurando una
            experiencia funcional desde el primer segundo.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item5" }}
        >
          <h2 className="about-project__funcionality-title">
            Filtrado por Tiempo:
          </h2>
          <p className="about-project__funcionality-desc">
            Procesamiento de rangos de fecha nativos en el servidor para
            segmentar tareas en &quot;Hoy&quot; y &quot;Próximos&quot;, optimizando la carga de
            datos mediante filtros de tiempo exactos.
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item6" }}
        >
          <h2 className="about-project__funcionality-title">
            Sincronización de Estado:
          </h2>
          <p className="about-project__funcionality-desc">
            Gestión de consistencia en el frontend mediante una función
            centralizada de Refetch en el Context API, que actualiza todas las
            listas tras operaciones de escritura (POST/PUT/DELETE).
          </p>
        </div>
        <div
          className="about-project__funcionality-item"
          style={{ gridArea: "item7" }}
        >
          <h2 className="about-project__funcionality-title">
            Validación de Propiedad:
          </h2>
          <p className="about-project__funcionality-desc">
            El sistema verifica el user_id en cada consulta a la base de datos
            antes de permitir cualquier operación, previniendo accesos no
            autorizados a nivel de infraestructura.
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
              Autenticación y Ciclo de Vida
            </h2>
            <p className="about-project__security-item-info">
              Gestión de sesiones enfocada en proteger al usuario y mejorar su
              experiencia en tiempo real.
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Sesiones Seguras: Uso de cookies protegidas (HttpOnly) para
                evitar que el acceso sea robado por scripts maliciosos.
              </li>
              <li>
                Cierre Automático: La sesión finaliza por seguridad tras un
                tiempo de inactividad, con un margen de 10 minutos de gracia.
              </li>
              <li>
                Avisos al Usuario: Temporizador en pantalla que alerta antes de
                que la sesión expire, evitando la pérdida de cambios.
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
              Validación en Doble Capa
            </h2>
            <p className="about-project__security-item-info">
              Sistema de doble filtro para asegurar que la información sea
              correcta antes de procesarla.
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Filtro en Cliente: Validación inmediata mientras el usuario
                escribe, ofreciendo respuestas claras y rápidas.
              </li>
              <li>
                Filtro en Servidor: Segunda verificación obligatoria para
                bloquear datos mal formados antes de que lleguen a la lógica del
                sistema.
              </li>
              <li>
                Reglas unificadas: Los mismos criterios de validación se aplican
                en ambos lados para evitar errores de compatibilidad.
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
              Seguridad a nivel de Infraestructura
            </h2>
            <p className="about-project__security-item-info">
              Protección de la base de datos y control de accesos mediante
              estándares profesionales.
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Protección de Datos: Consultas diseñadas para neutralizar
                ataques que intenten manipular o borrar la base de datos.
              </li>
              <li>
                Contraseñas Encriptadas: Las claves nunca se guardan como texto;
                se transforman en códigos ilegibles mediante técnicas de
                cifrado.
              </li>
              <li>
                Acceso Restringido: El servidor solo acepta peticiones de sitios
                autorizados, bloqueando cualquier intento externo desconocido.
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
              Entorno y Flujo de Trabajo
            </h2>
            <p className="about-project__security-item-info">
              Prácticas de desarrollo que garantizan un código organizado,
              privado y fácil de mantener.
            </p>
            <ul className="about-project__security-item-desc">
              <li>
                Datos Privados: Las llaves de seguridad y accesos a la base de
                datos están ocultos y nunca se suben al código público.
              </li>
              <li>
                Historial Limpio: Uso de ramas separadas para cada función,
                manteniendo un registro de cambios ordenado y profesional.
              </li>
              <li>
                Código Modular: Separación clara entre la seguridad y el resto
                de la aplicación para facilitar futuras mejoras sin romper el
                sistema.
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
            <img
              className="about-project__links-item-icon"
              src={githubIcon}
              alt="Logo de GitHub"
            />
            <p className="about-project__links-item-title">
              Explorar Código Fuente
            </p>
            <div className="about-project__resources-item-info">
              <p className="about-project__links-item-paragraph">
                Acceso al código completo con arquitectura modular, historial de
                desarrollo y estándares de Clean Code.
              </p>
              <button
                onClick={goToGitHubProject}
                className="about-project__links-button"
              >
                Ver respositorio
              </button>
            </div>
          </div>
          <div
            className="about-project__resources-links-item"
            style={{ gridArea: "box2" }}
          >
            <img
              className="about-project__links-item-icon"
              src={documentationIcon}
              alt="Logo de GitHub"
            />
            <p className="about-project__links-item-title">Guía de Endpoints</p>
            <div className="about-project__resources-item-info">
              <p className="about-project__links-item-paragraph">
                Detalle técnico de todas las rutas, parámetros y respuestas del
                servidor, facilitando la comprensión del flujo de datos y la
                integración.
              </p>
              <button className="about-project__links-button">
                Ver Documentación
              </button>
            </div>
          </div>
          <div
            className="about-project__resources-links-item"
            style={{ gridArea: "box3" }}
          >
            <img
              className="about-project__links-item-icon"
              src={deploymentIcon}
              alt="Logo de GitHub"
            />
            <p className="about-project__links-item-title">
              Entorno de producción
            </p>
            <div className="about-project__resources-item-info">
              <p className="about-project__links-item-paragraph">
                Aplicación optimizada y lista para despliegue. Actualmente
                disponible para ejecución en entorno local mediante la guía de
                instalación del repositorio.
              </p>
              <button className="about-project__links-button">
                Guía de instalación
              </button>
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
                Implementación de entornos de &quot;Proyectos&quot; separados.
                Esto permitirá agrupar tareas bajo contextos específicos,
                ofreciendo un nivel superior de organización al usuario.
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
