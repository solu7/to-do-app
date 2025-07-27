import "./Today.css";
import { useState } from "react";
import Task from "../components/Task/Task.jsx";
import addIcon from "../../assets/images/addIcon.svg";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal.jsx";

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
      </section>
      <div className="add-task">
        <img src={addIcon} alt="Icono de añadir" />
        <p onClick={handleModal}>Añadir tarea</p>
      </div>
      {!!modalIsOpen && <AddTaskModal />}
    </div>
  );
}
export default Today;
