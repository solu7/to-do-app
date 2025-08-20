import "./TodayView.css";

import { useState, useEffect } from "react";
import { useAddTaskModal } from "../../hooks/useAddTaskModal.js";
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";
import { getLatestTasks } from "../../services/tasksServices.js";

function Today() {
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
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div className="today">
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
            />
          ))
        ) : (
          <p>No hay tareas para mostrar.</p>
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
