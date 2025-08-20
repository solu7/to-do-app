import "./TaskCard.css";
import priority1Icon from "./assets/images/ItemIcon/priority1Icon.png";
import tagIcon from "./assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "./assets/images/SectionIcon/categoryIcon.png";

function TaskCard() {
  return (
    <div className="task">
      <section className="task__header">
        <div className="task__title">
          <p>Titulo de la tarea</p>
          <img
            className="task-priority-icon"
            src={priority1Icon}
            alt="Icono de prioridad que tiene la tarea"
          />
        </div>
        <p className="task-description">Descripcion de la tarea</p>
      </section>
      <section className="task__filters">
        <div className="task__filters-item">
          <img
            className="task__filters-item__icon"
            src={tagIcon}
            alt="Icono de tag"
          />
          <p>Tag 1</p>
        </div>
        <div className="task__filters-item">
          <img
            className="task__filters-item__icon"
            src={categoryIcon}
            alt="Icono de tag"
          />
          <p>Category 1</p>
        </div>
      </section>
      <hr className="task-card__hr" />
    </div>
  );
}
export default TaskCard;
