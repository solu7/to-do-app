import "./TodayView.css";

import { useState, useEffect } from "react";
import { useAddTaskModal } from "../../hooks/useAddTaskModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { getTagsInTask } from "../../../tags/services/tagsServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";

function Today({ onTaskClick }) {
  const { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();
  const [tagsInTask, setTagsInTask] = useState([]);

  const fetchTags = async (taskIds) => {
    if (!taskIds || taskIds.length === 0) {
      return;
    }
    try {
      const allTags = {};
      for (const taskId of taskIds) {
        const data = await getTagsInTask({ taskId });
        allTags[taskId] = data;
      }
      setTagsInTask(allTags);
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };
  const { tasks } = useTasks();

  useEffect(() => {
    const taskIds = tasks.map((task) => task.id);
    fetchTags(taskIds);
  }, [tasks]);
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
