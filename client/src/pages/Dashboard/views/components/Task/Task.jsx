import "./Task.css"
import priority4Icon from "./assets/images/priority4Icon.svg";


function Task() {
    return (
      <div className="task">
        <section className="task-header">
          <img
            className="task-priority-icon"
            src={priority4Icon}
            alt="Icono de prioridad que tiene la tarea"
          />
          <p className="task-title">Titulo de la tarea</p>
        </section>
        <p className="task-description">Descripcion de la tarea</p>
      </div>
    );
}
export default Task;