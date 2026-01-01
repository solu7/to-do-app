import completedIcon from "../../../../pages/Dashboard/assets/images/completedIcon.png";
import { useTasks } from "../../../../context/TaskContext.jsx";
import TaskCard from "../../TaskCard.jsx";

function CompletedView({ onTaskClick }) {
  const { completedTasks } = useTasks();
  return (
    <div className="task-view__container">
      <section className="task-view__header">
        <h3 className="task-view__header-title">
          Tareas <span>completadas</span>
        </h3>
        <img
          className="task-view__header-icon"
          src={completedIcon}
          alt="Icono de completado"
        />
      </section>
      <section className="task-view__tasks">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => onTaskClick(task.id)}
              tagsInTask={task.tags}
              categoriesInTask={task.categories}
              priority={task.priority}
              dueDate={task.due_date}
            />
          ))
        ) : (
          <section className="no-tasks__message">
            <h2>No has completado ninguna tarea :(</h2>
          </section>
        )}
      </section>
    </div>
  );
}
export default CompletedView;
