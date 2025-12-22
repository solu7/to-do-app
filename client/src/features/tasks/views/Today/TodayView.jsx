import { useTasks } from "../../../../context/TaskContext";
import { useTaskData } from "../../services/useTaskData";
import { getTagsInTask } from "../../../filters/tags/services/tagsServices";
import { getCategoriesInTask } from "../../../filters/categories/services/categoriesServices";
import { getTaskPriority } from "../../../filters/priorities/services/prioritiesServices";
import TaskCard from "../../TaskCard";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import todayIcon from "../../../../pages/Dashboard/assets/images/todayIcon.png";
import { useModal } from "../../hooks/useModal.js";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";

function TodayView({ onTaskClick }) {
  const addTaskModal = useModal();
  const { todayTasks } = useTasks();
  const { data: tagsInTask } = useTaskData(todayTasks, getTagsInTask);
  const { data: categoriesInTask } = useTaskData(
    todayTasks,
    getCategoriesInTask
  );
  const { data: priorityInTask } = useTaskData(todayTasks, getTaskPriority);
  return (
    <div className="task-view__container">
      <section className="task-view__header">
        <h3 className="task-view__header-title">
          Lo que tienes para{" "}
          <span className="task-view__header-title--highlight">hoy</span>
        </h3>
        <img
          className="task-view__header-icon"
          src={todayIcon}
          alt="Icono de bandeja de entrada"
        />
      </section>
      <section className="task-view__tasks">
        {todayTasks.length > 0 ? (
          todayTasks.map((task) => (
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
            <h2>No tienes tareas para hoy</h2>
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
export default TodayView;
