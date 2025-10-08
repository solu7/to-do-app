import "./CompletedView.css";
import completedIcon from "../../../../pages/Dashboard/assets/images/completedIcon.png";
import { useTasks } from "../../../../context/TaskContext.jsx";
import TaskCard from "../../TaskCard.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { useTaskData } from "../../services/useTaskData.js";
import { getTagsInTask } from "../../../tags/services/tagsServices.js";
import { getCategoriesInTask } from "../../../categories/services/categoriesServices.js";
import { getTaskPriority } from "../../../priorities/services/prioritiesServices.js";

function CompletedView({ onTaskClick }) {
  const { completedTasks } = useTasks();
  const { data: tagsInTask } = useTaskData(completedTasks, getTagsInTask);
  const { data: categoriesInTask } = useTaskData(
    completedTasks,
    getCategoriesInTask
  );
  const { data: priorityInTask } = useTaskData(completedTasks, getTaskPriority);
  return (
    <div className="completed__container">
      <section className="inbox__header">
        <h3 className="inbox__header-title">
          Tareas <span>completadas</span>
        </h3>
        <img
          className="inbox__header-icon"
          src={completedIcon}
          alt="Icono de completado"
        />
      </section>
      <section className="completed__tasks">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => onTaskClick(task.id)}
              tagsInTask={tagsInTask[task.id] || []}
              categoriesInTask={categoriesInTask[task.id] || []}
              priority={priorityInTask[task.id]?.priority ?? 0}
            />
          ))
        ) : (
          <section className="no-tasks__message">
            <h2>No tenes nada para hoy</h2>
            <img
              className="no-tasks__icon"
              src={cleanIcon}
              alt="Icono de limpio"
            />
          </section>
        )}
      </section>
    </div>
  );
}
export default CompletedView;
