import "./Today.css";
import { useState } from "react";
import Task from "../components/Task/Task.jsx";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton.jsx";
import AddTaskModal from "../components/Task/modals/AddTaskModal/AddTaskModal.jsx";

function Today() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  return (
    <div className="today">
      <h3 className="today-title">
        Lo que tienes <span>para hoy</span>
      </h3>
      <section className="today-tasks">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </section>
      <AddTaskButton onClick={handleModal}/>
      {!!modalIsOpen && <AddTaskModal />}
    </div>
  );
}
export default Today;
