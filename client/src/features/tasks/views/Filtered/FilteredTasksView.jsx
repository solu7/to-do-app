import "./FilteredTasksView.css";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
import TaskCard from "../../TaskCard.jsx";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import priorityIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import taskIcon from "../../assets/images/SectionIcon/taskIcon.png";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";

function FilteredTasksView({ onTaskClick }) {
  const ICON_MAP = {
    categoryId: categoryIcon,
    tagId: tagIcon,
    priority: priorityIcon,
  };
  const { tasks, filters } = useFilteredTasks();

  const filterKey = Object.keys(filters).find((key) => key !== "name");
  const filterName = filters.name ? decodeURIComponent(filters.name) : null;
  const displayIcon = filterKey ? ICON_MAP[filterKey] : null;
  return (
    <div className="task-view__container">
      <section className="task-view__header">
        <h3 className="task-view__header-title">
          Tus <span>tareas</span>
        </h3>
        <img
          className="task-view__header-icon"
          src={taskIcon}
          alt="Icono de bandeja de entrada"
        />
        <h3 className="task-view__header-title">con</h3>
        {filterName && displayIcon && (
          <div className="filtered-tasks__filter">
            <img
              className="filtered-tasks__filter-icon"
              src={displayIcon}
              alt="Icono de filtro"
            />
            <p>{filterName}</p>
          </div>
        )}
      </section>
      {tasks.length === 0 ? (
        <section className="no-tasks__message">
          <h2>No se encontraron tareas con estos filtros.</h2>
          <img
            className="no-tasks__icon"
            src={cleanIcon}
            alt="Icono de limpio"
          />
        </section>
      ) : (
        <section className="task-view__tasks">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => onTaskClick(task.id)}
              tagsInTask={task.tags || []}
              categoriesInTask={task.categories || []}
              priority={task.priority ?? 0}
              dueDate={task.due_date}
            />
          ))}
        </section>
      )}
    </div>
  );
}
export default FilteredTasksView;
