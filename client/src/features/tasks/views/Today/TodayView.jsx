import "./TodayView.css";

import { useState, useEffect } from "react";
import { useAddTaskModal } from "../../hooks/useAddTaskModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import cleanIcon from "../../../../pages/Dashboard/assets/images/cleanIcon.png";
import { getLatestTasks } from "../../services/tasksServices.js";

function Today({ onTaskClick }) {
  const { addTaskModalIsOpen, openAddTaskModal, closeAddTaskModal } =
    useAddTaskModal();
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const data = await getLatestTasks();
      setTasks(data);
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };
  const handleTaskAdded = () => {
    fetchTasks(); // Vuelve a cargar las tareas
    closeAddTaskModal(); // Cierra el modal
  };

  useEffect(() => {
    fetchTasks();
  }, []);
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
        onTaskAdded={handleTaskAdded}
      />
    </div>
  );
}
export default Today;
