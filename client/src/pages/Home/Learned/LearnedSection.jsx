import "./LearnedSection.css";

function LearnedSection() {
  return (
    <div className="learned">
      <h2 className="hp__section-title learned__title">
        ¿Que aprendi con el <span>desarrollo de esta app</span>?
      </h2>
      <div className="learned__list">
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
  );
}
export default LearnedSection;
