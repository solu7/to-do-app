import "./AddTaskButton.css";
import addIconWhite from "../../../../pages/Dashboard/assets/images/addIconWhite.png";

function AddTaskButton({ onClick }) {
  return (
    <div className="add-task-container" onClick={onClick}>
      <section className="add-task">
        <img src={addIconWhite} alt="Icono de añadir" />
        <p>Añadir tarea</p>
      </section>
    </div>
  );
}
export default AddTaskButton;
