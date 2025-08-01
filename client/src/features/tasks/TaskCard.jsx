import "./TaskCard.css"
import priorityIcon from "./assets/images/SectionIcon/priorityIcon.png"


function TaskCard() {
    return (
      <div className="task">
        <section className="task-header">
          <img
            className="task-priority-icon"
            src={priorityIcon}
            alt="Icono de prioridad que tiene la tarea"
          />
          <p className="task-title">Titulo de la tarea</p>
        </section>
        <p className="task-description">Descripcion de la tarea</p>
      </div>
    );
}
export default TaskCard;