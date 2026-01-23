<h1 align="center">🚀 Full-Stack Task Manager </h2>

<p align="center"> <a href="https://agvstindev-to-do-app.vercel.app" target="_blank"> <img src="https://img.shields.io/badge/Demo_en_Vivo-Vercel-black?style=for-the-badge&logo=vercel" alt="Demo Link"> </a> <img src="https://img.shields.io/badge/Status-Producción-success?style=for-the-badge" alt="Status"> </p>

## 🧠 El Desafío de Ingeniería

Este proyecto no nació para ser una simple lista de tareas, sino como un **desafío evolutivo** para dominar el desarrollo Full-Stack. Mi objetivo fue construir una herramienta robusta desde cero, priorizando la **seguridad del usuario**, la **integridad de los datos** y una **experiencia de usuario fluida**.

En lugar de usar soluciones prefabricadas, implementé lógicas personalizadas como el **sistema de sesiones con periodo de gracia** y el **redimensionador de paneles** para profundizar en el funcionamiento interno de las tecnologías.

## 🛠️ Tech Stack

| Tecnología            | Propósito en este Proyecto                                                    |
| :-------------------- | :---------------------------------------------------------------------------- |
| **React + Vite**      | Agilidad en desarrollo y una experiencia de usuario (UX) veloz.               |
| **Context API**       | Gestión de estado global segmentada por dominios: Usuarios, Tareas y Filtros. |
| **Node.js + Express** | Creación de una API REST escalable bajo el patrón MVC.                        |
| **MySQL**             | Manejo de relaciones **Many-to-Many** e integridad referencial.               |
| **JWT & Cookies**     | Autenticación segura mediante `httpOnly` y firma de tokens.                   |
| **Zod**               | Validación estricta de esquemas de datos antes de impactar la DB.             |

## 🏗️ Arquitectura y Decisiones de Backend

### Organización por Funcionalidades (Feature-based)

A diferencia de la estructura tradicional por capas, opté por organizar el proyecto en **módulos de funcionalidades** (`auth`, `tasks`, `tags`, `categories`). Cada feature encapsula su propio modelo, controlador y rutas, lo que facilita la escalabilidad y el mantenimiento del código a medida que la aplicación crece.

### El Patrón MVC y Transformación de Datos

Implementé el patrón **Modelo-Vista-Controlador** para separar responsabilidades de manera clara:

- **Modelos**: Encargados de las consultas SQL puras y la lógica de persistencia.
- **Controladores**: Gestionan la comunicación entre el modelo y la respuesta al cliente.
- **Data Transformation**: Diseñé funciones de formateo (como `formatTaskMetadata`) para procesar resultados complejos de SQL (usando `GROUP_CONCAT`) y convertirlos en objetos JSON anidados y limpios para el frontend.

### SQL: Potencia Relacional e Integridad

Elegí **MySQL** sobre opciones NoSQL específicamente para manejar relaciones **Many-to-Many** de forma nativa y segura.

- **Consultas Dinámicas**: Implementé lógica para obtener tareas basadas en rangos de fecha ("Hoy", "Próximos") y filtros por categorías o etiquetas.
- **Aislamiento por Usuario**: Cada consulta SQL está blindada mediante el filtrado estricto por `userId`, garantizando que la información solo sea accesible para su propietario legal o invitado correspondiente.

### Seguridad y Validación de Datos:

Implementé una capa de seguridad multicapa que comienza con validaciones de esquemas mediante **Zod** en el punto de entrada. Esto, sumado al uso de **middlewares de autenticación** y cookies `httpOnly`, garantiza que la API sea resistente a inyecciones y accesos no autorizados.

## 🔌 API Reference

Todos los endpoints (excepto los de autenticación pública) requieren un token válido enviado a través de cookies (`httpOnly`).

### 🔑 Autenticación (`/auth`)

| Método | Endpoint    | Descripción                                                   |
| :----- | :---------- | :------------------------------------------------------------ |
| `POST` | `/register` | Registro de nuevo usuario con validaciones de esquema.        |
| `POST` | `/login`    | Autenticación de usuario y entrega de token.                  |
| `POST` | `/guest`    | Inicio de sesión instantáneo como invitado.                   |
| `POST` | `/refresh`  | Renueva la sesión si el token está en el "periodo de gracia". |
| `POST` | `/logout`   | Cierre de sesión y limpieza de cookies.                       |

### 📝 Tareas (`/tasks`)

| Método   | Endpoint      | Descripción                                    |
| :------- | :------------ | :--------------------------------------------- |
| `GET`    | `/`           | Obtiene las tareas del Inbox.                  |
| `GET`    | `/all`        | Obtiene el listado completo de tareas.         |
| `GET`    | `/today`      | Filtra tareas programadas para el día actual.  |
| `GET`    | `/upcoming`   | Filtra tareas para los próximos 7 días.        |
| `POST`   | `/`           | Crea una nueva tarea.                          |
| `PATCH`  | `/:id`        | Actualización parcial de título o descripción. |
| `PATCH`  | `/:id/toggle` | Alterna el estado de completado (Boolean).     |
| `DELETE` | `/:id`        | Eliminación física de la tarea.                |

### 🏷️ Etiquetas y Categorías

**Tags (`/tags`)**

- `GET /`: Lista todas las etiquetas creadas por el usuario.
- `POST /:taskId`: Asigna una etiqueta existente a una tarea.
- `DELETE /resource/:tagId`: Elimina la etiqueta de forma global.

**Categories (`/categories`)**

- `GET /`: Lista todas las categorías del usuario.
- `POST /:taskId`: Vincula una categoría a una tarea específica.
- `DELETE /:taskId`: Desvincula la categoría de la tarea.

### ⚙️ Panel de Usuario (`/users`)

| Método   | Endpoint    | Descripción                                                 |
| :------- | :---------- | :---------------------------------------------------------- |
| `GET`    | `/`         | Obtiene el perfil y metadatos del usuario.                  |
| `PUT`    | `/username` | Actualiza el nombre de perfil.                              |
| `PUT`    | `/password` | Cambio de contraseña con validación previa.                 |
| `DELETE` | `/account`  | Eliminación completa de la cuenta y sus datos relacionados. |

### 📅 Fechas y Prioridades

- **Fechas (`/dates`):** `POST /:taskId` para asignar fechas límite y `GET /:taskId` para consultarlas.

- **Prioridades (`/priorities`):** Gestión de niveles de importancia por tarea (`GET`, `POST`, `DELETE`).

## 📸 Visual Preview

### 💻 Desktop Experience

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <img src="./screenshots/dashboard.png" alt="Main Dashboard">
        <p align="center"><i>Dashboard principal: Gestión centralizada de tareas con filtros inteligentes.</i></p>
      </td>
      <td width="50%">
        <img src="./screenshots/appmodals.png" alt="Task Modals">
        <p align="center"><i>Sistema de modales dinámicos para asignación de fechas y metadatos.</i></p>
      </td>
    </tr>
  </table>
</div>

### 🎬 Interactividad (Demos en Video)

<div align="center">
  <table>
    <tr>
      <td width="50%">
        <p align="center">🎥 <b>Panel de Edición Lateral</b><br>Desplazamiento fluido y redimensionamiento dinámico.</p>
      </td>
      <td width="50%">
        <p align="center">🎥 <b>Añadir Tarea & Quick Actions</b><br>Flujo de creación de tareas sin fricción.</p>
      </td>
    </tr>
  </table>
</div>

### 📱 Mobile & Responsive Design

<div align="center">
  <table>
    <tr>
      <td width="33%">
        <img src="./screenshots/movil-homepage.png" alt="Mobile Home">
        <p align="center"><i>Landing Page</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/movil-dashboard-opened-sidebar.png" alt="Mobile Sidebar">
        <p align="center"><i>Navegación Lateral</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/movil-dashboard-opened-editpanel.png" alt="Mobile Edit">
        <p align="center"><i>Edición Móvil</i></p>
      </td>
    </tr>
    <tr>
      <td width="33%">
        <img src="./screenshots/movil-aboutproject.png" alt="Mobile About">
        <p align="center"><i>Arquitectura UI</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/movil-aboutme.png" alt="Mobile Profile">
        <p align="center"><i>Perfil Dev</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/movil-opened-navbar.png" alt="Mobile Menu">
        <p align="center"><i>Menú Global</i></p>
      </td>
    </tr>
  </table>
</div>

### 🔐 Seguridad y Acceso

<div align="center">
  <table>
    <tr>
      <td width="33%">
        <img src="./screenshots/login-page.png" alt="Login">
        <p align="center"><i>Acceso Seguro</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/register-page.png" alt="Register">
        <p align="center"><i>Registro con Validación</i></p>
      </td>
      <td width="33%">
        <img src="./screenshots/session-modal.png" alt="Session Warning">
        <p align="center"><i>Gestión de Sesión</i></p>
      </td>
    </tr>
  </table>
</div>
## ✨ Frontend: Experiencia de Usuario y Dinamismo
En este proyecto, la interfaz no es estática; fue diseñada para ser una herramienta que se adapta al flujo de trabajo del usuario, priorizando la interactividad y el feedback constante.
### 1. Gestión de Sesión "Resiliente"
Implementé un sistema de autenticación diseñado para evitar la frustración del usuario por pérdida de datos:
* **Aviso de Expiración**: Un modal preventivo notifica al usuario minutos antes de que su token expire.
*  **Periodo de Gracia**: Si la sesión finaliza pero no han pasado más de 10 minutos, el usuario cuenta con una ventana para renovar su sesión activamente y mantener su progreso.

### 2. UI Dinámica con el Custom Hook `useResizer`

Para ofrecer un nivel de personalización superior, desarrollé el hook `useResizer`.

- **Control Total**: Permite al usuario ajustar manualmente el ancho del panel de edición de tareas.
- **Dinamismo**: Esta funcionalidad rompe con los layouts rígidos, permitiendo que el usuario acomode la interfaz según su comodidad y tamaño de pantalla.

### 3. Feedback Visual y Micro-interacciones

- **Animaciones**: Integración de transiciones suaves (hover y transform scale) que confirman visualmente cada interacción del usuario.
- **Sistema de Invitados**: Flujo optimizado para que nuevos usuarios prueben la app sin fricción, activando la carga de datos de ejemplo mediante transacciones SQL en el backend.

## 📈 Aprendizajes y Retos Superados

El desarrollo de esta aplicación fue un proceso de "refactorización constante", donde cada obstáculo se convirtió en una oportunidad para mejorar la arquitectura.

### 1. El Reto del Estado Global (Context API)

Inicialmente, intenté centralizar toda la información en un único contexto. Sin embargo, a medida que la aplicación creció, esto causó problemas de performance y renderizados innecesarios.

- **Solución**: Segmenté el estado en múltiples dominios: `UserContext`, `TaskContext` y `FilterContext`, logrando una lógica mucho más limpia y eficiente.

### 2. Gestión de la Complejidad Estructural

Mantener la organización de carpetas fue uno de los retos más grandes a medida que el proyecto se expandía.

- **Solución**: Adoptar una arquitectura basada en **Features** me permitió mantener el control total sobre la aplicación, demostrando que una buena planificación inicial es clave para el éxito a largo plazo.

### 3. Del SQL Plano a Objetos Complejos

Aprender a manejar relaciones relacionales me obligó a dominar la transformación de datos en el servidor.

- **Solución**: Utilicé el patrón MVC para asegurar que el controlador entregue exactamente lo que el frontend necesita, sin sobrecargar al cliente con lógica de base de datos innecesaria.

## 🚀 Roadmap: Próximos Pasos

Aunque la aplicación es totalmente funcional, tengo planeado implementar las siguientes mejoras técnicas:

- [ ] **Drag & Drop (Prioridad)**: Implementar una lógica de reordenamiento de tareas persistente en la DB para mejorar la jerarquía visual.
- [ ] **Google OAuth 2.0**: Integrar autenticación social para facilitar el acceso a nuevos usuarios.
- [ ] **Sistema de Proyectos**: Expandir la base de datos para permitir la organización de tareas en espacios de trabajo o proyectos específicos.
- [ ] **Feedback de Selección**: Añadir indicadores visuales dinámicos en las cards de tareas que están siendo editadas actualmente.

---

## 🛠️ Instalación y Configuración

Sigue estos pasos para levantar el entorno de desarrollo de forma integrada.

### 1. Requisitos Previos

- **Node.js**: v18.0.0 o superior.
- **MySQL**: Una instancia local o remota.
- **Git**: Para la clonación del repositorio.

### 2. Clonar y Preparar el Servidor

```bash
# Clonar el repositorio
git clone [https://github.com/agustin-salva-dev/to-do-app.git]
cd to-do-app
```

### 3. Configuración de Variables de Entorno

`/server/.env`

- **PORT**=3000
- **DATABASE_URL**=mysql://usuario:password@localhost:3306/tu_base_de_datos
- **JWT_SECRET**=tu_secreto_super_seguro\

`/client/.env.development`

- **VITE_API_URL**=http://localhost:3000

### 4. Instalación de Dependencias

```bash
# Instalación global de dependencias (Raíz, Server y Client)
npm install
```

### 5. Ejecución del Proyecto

Gracias a la implementación de **Concurrently**, puedes iniciar ambos entornos con un solo comando desde la carpeta raíz:

```bash
# Inicia Servidor y Cliente en paralelo
En `/to-do-app`, ejecuta `npm run start` para iniciar el servidor y el client en paralelo.

# Servidor
En `/server`, ejecuta `node index.js`.

# Cliente
En `/client`, ejecuta `npm run dev`.
```

---

<p align="center">Desarrollado con ❤️ por Agustin Salva</p>
