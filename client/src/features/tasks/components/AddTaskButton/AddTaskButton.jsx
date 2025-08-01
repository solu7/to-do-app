import "./AddTaskButton.css";
import addIcon from "../../../../pages/Dashboard/assets/images/addIcon.png";

function AddTaskButton({ onClick }) {
  return (
    <div className="add-task-container" onClick={onClick}>
      <section className="add-task">
        <img src={addIcon} alt="Icono de añadir" />
        <p>Añadir tarea</p>
      </section>
    </div>
  );
}
export default AddTaskButton;
