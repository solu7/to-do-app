import "./Today.css";
import Task from "../components/Task/Task.jsx";
import addIcon from "../../assets/images/addIcon.svg";

function Today() {
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
        <p>Añadir tarea</p>
      </div>
    </div>
  );
}
export default Today;
