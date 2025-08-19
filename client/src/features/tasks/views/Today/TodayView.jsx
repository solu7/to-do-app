import "./TodayView.css";

import { useAddTaskModal } from "../../hooks/useAddTaskModal.js"
import TaskCard from "../../TaskCard.jsx";
import AddTaskButton from "../../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";

function Today() {
 const { addTaskModalIsOpen ,openAddTaskModal, closeAddTaskModal } = useAddTaskModal();
  return (
    <div className="today">
      <h3 className="today-title">
        Lo que tienes <span>para hoy</span>
      </h3>
      <section className="today-tasks">
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
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
