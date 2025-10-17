import "./FilteredTasksView.css";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
import TaskCard from "../../TaskCard.jsx";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import priorityIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import { useTaskData } from "../../services/useTaskData.js";
import { getTagsInTask } from "../../../filters/tags/services/tagsServices.js";
import { getCategoriesInTask } from "../../../filters/categories/services/categoriesServices.js";
import { getTaskPriority } from "../../../filters/priorities/services/prioritiesServices.js";
import taskIcon from "../../assets/images/SectionIcon/taskIcon.png";

function FilteredTasksView({ onTaskClick }) {
  const ICON_MAP = {
    categoryId: categoryIcon,
    tagId: tagIcon,
    priority: priorityIcon,
  };
  const { tasks, filters } = useFilteredTasks();

  const { data: tagsInTask } = useTaskData(tasks, getTagsInTask);
  const { data: categoriesInTask } = useTaskData(tasks, getCategoriesInTask);
  const { data: priorityInTask } = useTaskData(tasks, getTaskPriority);

  const filterKey = Object.keys(filters).find((key) => key !== "name");
  const filterName = filters.name ? decodeURIComponent(filters.name) : null;
  const displayIcon = filterKey ? ICON_MAP[filterKey] : null;
  return (
    <div className="filtered-tasks__container">
      <section className="filtered-tasks__header">
        <h3 className="filtered-tasks__header-title">
          Tus <span>tareas</span>
        </h3>
        <img
          className="filtered-tasks__header-icon"
          src={taskIcon}
          alt="Icono de bandeja de entrada"
        />
        <h3 className="filtered-tasks__header-title">con</h3>
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
        <p>No se encontraron tareas con estos filtros.</p>
      ) : (
        <section className="filtered-task__list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => onTaskClick(task.id)}
              tagsInTask={tagsInTask[task.id] || []}
              categoriesInTask={categoriesInTask[task.id] || []}
              priority={priorityInTask[task.id]?.priority ?? 0}
            />
          ))}
        </section>
      )}
    </div>
  );
}
export default FilteredTasksView;
