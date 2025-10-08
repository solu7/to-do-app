import "./InboxView.css";
import { useAddTaskModal } from "../../hooks/useAddTaskModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { getTagsInTask } from "../../../tags/services/tagsServices.js";
import { getCategoriesInTask } from "../../../categories/services/categoriesServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import { useTaskData } from "../../services/useTaskData.js";
import { getTaskPriority } from "../../../priorities/services/prioritiesServices.js";
import inboxIcon from "../../../../pages/Dashboard/assets/images/inboxIcon.png"

function Inbox({ onTaskClick }) {
  const { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();
  const { tasks } = useTasks();
  const { data: tagsInTask } = useTaskData(tasks, getTagsInTask);
  const { data: categoriesInTask } = useTaskData(tasks, getCategoriesInTask);
  const { data: priorityInTask } = useTaskData(tasks, getTaskPriority);
  return (
    <div
      className={
        tasks.length > 0 ? "inbox__container" : "inbox__container no-tasks"
      }
    >
      <section className="inbox__header">
      <h3 className="inbox__header-title">
        Bandeja <span>de entrada</span>
      </h3>
      <img className="inbox__header-icon" src={inboxIcon} alt="Icono de bandeja de entrada" />
      </section>
      <section className="inbox__tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
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
      <AddTaskButton onClick={openAddTaskModal} />

      <AddTaskModal
        onClose={closeAddTaskModal}
        AddTaskModalIsOpen={addTaskModalIsOpen}
      />
    </div>
  );
}
export default Inbox;
