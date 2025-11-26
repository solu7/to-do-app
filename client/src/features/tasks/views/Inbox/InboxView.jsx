import "./InboxView.css";
import { useModal } from "../../hooks/useModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { getTagsInTask } from "../../../filters/tags/services/tagsServices.js";
import { getCategoriesInTask } from "../../../filters/categories/services/categoriesServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import { useTaskData } from "../../services/useTaskData.js";
import { getTaskPriority } from "../../../filters/priorities/services/prioritiesServices.js";
import inboxIcon from "../../../../pages/Dashboard/assets/images/inboxIcon.png";

function Inbox({ onTaskClick }) {
  const addTaskModal = useModal();
  const { inboxTasks } = useTasks();
  const { data: tagsInTask } = useTaskData(inboxTasks, getTagsInTask);
  const { data: categoriesInTask } = useTaskData(
    inboxTasks,
    getCategoriesInTask
  );
  const { data: priorityInTask } = useTaskData(inboxTasks, getTaskPriority);
  return (
    <div
      className={
        inboxTasks.length > 0 ? "inbox__container" : "inbox__container no-tasks"
      }
    >
      <section className="inbox__header">
        <h3 className="inbox__header-title">
          Bandeja <span>de entrada</span>
        </h3>
        <img
          className="inbox__header-icon"
          src={inboxIcon}
          alt="Icono de bandeja de entrada"
        />
      </section>
      <section className="inbox__tasks">
        {inboxTasks.length > 0 ? (
          inboxTasks.map((task) => (
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
      <AddTaskButton onClick={addTaskModal.open} />

      <AddTaskModal
        onClose={addTaskModal.close}
        AddTaskModalIsOpen={addTaskModal.isOpen}
      />
    </div>
  );
}
export default Inbox;
