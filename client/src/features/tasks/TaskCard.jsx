import "./TaskCard.css";
import priority1Icon from "./assets/images/ItemIcon/priority1Icon.png";

function TaskCard() {
  return (
    <div className="task">
      <section className="task-header">
        <img
          className="task-priority-icon"
          src={priority1Icon}
          alt="Icono de prioridad que tiene la tarea"
        />
        <p className="task-title">Titulo de la tarea</p>
      </section>
      <p className="task-description">Descripcion de la tarea</p>
      <hr className="task-card__hr"/>
    </div>
  );
}
export default TaskCard;
