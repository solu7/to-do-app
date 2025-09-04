import "./TodayView.css";
import { useAddTaskModal } from "../../hooks/useAddTaskModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { getTagsInTask } from "../../../tags/services/tagsServices.js";
import { getCategoriesInTask } from "../../../categories/services/categoriesServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import { useTaskData } from "../../services/useTaskData.js";

function Today({ onTaskClick }) {
  const { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();
  const { tasks } = useTasks();
  const { data: tagsInTask } = useTaskData(
    tasks,
    getTagsInTask
  );
  const { data: categoriesInTask } = useTaskData(tasks, getCategoriesInTask);
  return (
    <div
      className={
        tasks.length > 0 ? "today-container" : "today-container no-tasks"
      }
    >
      <h3 className="today-title">
        Lo que tienes <span>para hoy</span>
      </h3>
      <section className="today-tasks">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              onClick={() => onTaskClick(task)}
              tagsInTask={tagsInTask[task.id] || []}
              categoriesInTask={categoriesInTask[task.id] || []}
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
export default Today;
