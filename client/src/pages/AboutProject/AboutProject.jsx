import "./AboutProject.css";
import Navbar from "../../layout/NavBar/Navbar.jsx";
function AboutProject() {
  return (
    <div className="about-project">
      <Navbar />
      <div className="about-project__heading">
        <h1>To-Do App</h1>
        <h4>Coded by Agustin Salva.</h4>
      </div>
      <section className="about-project__structure">
        <h2 className="about-project__section-title">
          Estructura del proyecto
        </h2>
        <section className="about-project__project-structure">
          <h2 className="about-project__structure-title">
            Modelo: Client-Server Distribuido
          </h2>
          <p>
            La aplicación emplea un diseño Full-Stack modular, utilizando
            tecnologias como React, Node, Express y Mysql, proporcionándole una
            buena escalabilidad y separación de responsabilidades (SoC).
          </p>
          <div>
            <p>
              Cliente / Frontend (React): Se encarga de la UI y la presentación.
            </p>
            <p>
              Servidor / Backend (Node/Express): Maneja la lógica de negocio,
              autenticación y base de datos.
            </p>
          </div>
          <p>
            La comunicación entre ambos es puramente RESTful (peticiones HTTP),
            con la autenticación de sesiones gestionada mediante JSON Web Tokens
            (JWT). El código se divide en módulos por dominio para simplificar
            el mantenimiento.
          </p>
        </section>
        <section className="about-project__frontend-structure">
          <h2 className="about-project__structure-title">
            Frontend: Módulos de Componentes y Lógica
          </h2>
          <p>
            El cliente está organizado para maximizar la reutilización de código
            y la separación de intereses mediante dos principios clave:
          </p>
          <div>
            <p>
              Arquitectura por Features: El código está dividido por
              funcionalidades (auth, tasks, filters), permitiendo que cada
              módulo sea independiente y fácil de mantener.
            </p>
            <p>
              Custom Hooks: La lógica de negocio y las llamadas a la API se
              extraen a Hooks personalizados. Esto asegura que los componentes
              de la UI permanezcan "tontos" (dumb), enfocados únicamente en la
              presentación y el estado local.
            </p>
          </div>
          <p>
            Se utiliza react-router-dom para la gestión de rutas y
            react-hook-form con @hookform/resolvers para manejar formularios y
            validaciones complejas de manera eficiente.
          </p>
        </section>
        <section className="about-project__backend-structure">
          <h2 className="about-project__structure-title">
            Backend: Patrón MVC y Módulos
          </h2>
          <p>
            El servidor está estrictamente organizado mediante un Patrón MVC
            (Modelo-Vista-Controlador) implícito, con una división de código por
            dominio de negocio (auth, tasks, users, etc.).
          </p>
          <div>
            <p>
              Rutas (.routes.js): Definen los endpoints y aplican middlewares de
              seguridad.
            </p>
            <p>
              Controladores (.controller.js): Encargados de la Lógica de Negocio
              y el manejo de la petición/respuesta, como la validación inicial
              de datos y el manejo de errores HTTP (ej. 409 Conflict).
            </p>
            <p>
              Modelos (.model.js): Responsabilidad única de la capa de
              persistencia (MySQL/PostgreSQL), donde se ejecutan todas las
              consultas SQL.
            </p>
          </div>
          <p>
            Esta estructura se complementa con herramientas de seguridad
            esenciales como bcrypt para hashing de contraseñas y
            express-validator para la validación de inputs.
          </p>
        </section>
      </section>
      <section className="about-project__functionality">
        <h2 className="about-project__section-title">
          Funcionalidad y lógica de negocio
        </h2>
        <div className="about-project__functionality-content">
          <section className="about-project__funcionality-item">
            <h2 className="about-project__funcionality-title">
              Gestión Total de Recursos (CRUD Completo)
            </h2>

            <p className="about-project__funcionality-desc">
              La aplicación cuenta con funcionalidad CRUD en todos los elementos
              principales del sistema: Tareas, Tags, Categorías y Usuarios. El
              sistema permite la manipulación y edición en tiempo real de estos
              desde el panel de control, permitiendo al usuario establecer
              tareas con múltiples estados. Ademas de poder modificar la
              informacion del usuario.
            </p>
          </section>
          <section className="about-project__funcionality-item">
            <h2 className="about-project__funcionality-title">
              Modelado Relacional N:M y Robustez de IDs
            </h2>
            <p className="about-project__funcionality-desc">
              El sistema soporta relaciones Muchos-a-Muchos (N:M) para vincular
              Tareas con múltiples Tags y Categorías a través de tablas pivote.
              Se emplea la librería nanoid para generar identificadores
              alfanuméricos únicos en lugar de IDs autoincrementales, lo que
              aumenta la robustez del sistema y elimina dependencias
              secuenciales.
            </p>
          </section>
          <section className="about-project__funcionality-item">
            <h2 className="about-project__funcionality-title">
              Filtrado Dinámico de Consultas SQL
            </h2>
            <p className="about-project__funcionality-desc">
              La función getFilteredTasks demuestra un manejo avanzado de
              consultas. El backend construye la consulta SQL dinámicamente con
              los parámetros proporcionados (priority, tagId, isCompleted,
              etc.). Se utilizan las cláusulas LEFT JOIN y HAVING con
              FIND_IN_SET para filtrar eficientemente las tareas basadas en sus
              múltiples Tags o Categorías.
            </p>
          </section>
          <section className="about-project__funcionality-item">
            <h2 className="about-project__funcionality-title">
              Flujos de Trabajo Inteligentes
            </h2>
            <p className="about-project__funcionality-desc">
              El Dashboard presenta flujos de trabajo clave, centralizando la
              gestión de las tareas basadas en su estado y fecha. Esto incluye
              la bandeja de Inbox (para tareas rápidas sin fecha, no
              completadas) y las secciones dedicadas a "Today" y "Upcoming"
              (asumiendo su existencia), ofreciendo una navegación guiada por
              prioridad.
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
export default AboutProject;
