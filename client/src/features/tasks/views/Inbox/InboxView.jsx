import { useModal } from "../../hooks/useModal.js";
import { useTasks } from "../../../../context/TaskContext";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import inboxIcon from "../../../../pages/Dashboard/assets/images/inboxIcon.png";

function Inbox({ onTaskClick }) {
  const addTaskModal = useModal();
  const { inboxTasks } = useTasks();
  return (
    <div className="task-view__container">
      <section className="task-view__header">
        <h3 className="task-view__header-title">
          Bandeja{" "}
          <span className="task-view__header-title--highlight">de entrada</span>
        </h3>
        <img
          className="task-view__header-icon"
          src={inboxIcon}
          alt="Icono de bandeja de entrada"
        />
      </section>
      <section className="task-view__tasks">
        {inboxTasks.length > 0 ? (
          inboxTasks.map((task) => (
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
            <h2>No tienes tareas disponibles</h2>
            <img
              className="no-tasks__icon"
              src={cleanIcon}
              alt="Icono de limpio"
            />
          </section>
        )}
      </section>
      <AddTaskButton onClick={addTaskModal.open} />

      <AddTaskModal onClose={addTaskModal.close} isOpen={addTaskModal.isOpen} />
    </div>
  );
}
export default Inbox;
