import "./TaskCard.css";
import tagIcon from "./assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "./assets/images/SectionIcon/categoryIcon.png";
import dateIcon from "./assets/images/ItemIcon/date.png";
import { TaskPrioritiesList } from "../filters/priorities/data/TaskPrioritiesList";
import { formatTaskCardDate } from "./utils/taskDateFormatter";

function TaskCard({
  title,
  description,
  onClick,
  tagsInTask = [],
  categoriesInTask = [],
  priority,
  dueDate,
}) {
  const priorityData = TaskPrioritiesList.find((p) => p.value === priority);
  const priorityIcon = priorityData ? priorityData.icon : null;

  const dateText = formatTaskCardDate(dueDate);
  return (
    <div className="task" onClick={onClick}>
      <header className="task__header">
        <div className="task__title-wrapper">
          <p className="task__title">{title}</p>
          {priorityIcon && (
            <img
              className="task__priority-icon"
              src={priorityIcon}
              alt="Icono de prioridad de la tarea"
            />
          )}
        </div>
        {dateText && (
          <div className="task__date-badge">
            <img src={dateIcon} alt="Icono fecha" className="task__date-icon" />
            <span>{dateText}</span>
          </div>
        )}
      </header>
      <div className="task__body">
        <p className="task-description">{description}</p>
      </div>
      <section className="task__filters">
        {tagsInTask.length > 0 &&
          tagsInTask.map((tag) => (
            <div className="task__filters-item" key={tag.id}>
              <img
                className="task__filters-item__icon"
                src={tagIcon}
                alt="Icono de tag"
              />
              <p>{tag.name}</p>
            </div>
          ))}
        {categoriesInTask.length > 0 &&
          categoriesInTask.map((category) => (
            <div className="task__filters-item" key={category.id}>
              <img
                className="task__filters-item__icon"
                src={categoryIcon}
                alt="Icono de categoría"
              />
              <p>{category.name}</p>
            </div>
          ))}
      </section>
      <hr className="task-card__hr" />
    </div>
  );
}
export default TaskCard;
