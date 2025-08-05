import "./EditPanel.css";
import todayIcon from "../../assets/images/todayIcon.png";
import commentIcon from "../../assets/images/commentIcon.png";
import priorityIcon from "../../../../features/tasks/assets/images/SectionIcon/priorityIcon.png";
import tagIcon from "../../../../features/tasks/assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "../../../../features/tasks/assets/images/SectionIcon/categoryIcon.png";
import deleteIcon from "../../../../features/tasks/assets/images/SectionIcon/deleteIcon.png";

function EditPanel() {
  return (
    <div className="edit-panel">
      <section className="edit-panel__items">
        <div className="edit-panel__date-container">
          <img
            className="edit-panel__date-icon"
            src={todayIcon}
            alt="Icono de hoy"
          />
          <p className="edit-panel__date">Fecha que le pusiste a la tarea</p>
        </div>
        <label htmlFor="" className="edit-panel__completed-container">
          <input className="edit-panel__completed" type="checkbox" />
          <span className="edit-panel__completed-checkmark"></span>
        </label>
      </section>
      <section className="edit-panel__task">
        <div className="edit-panel__task-main">
          <h3 className="edit-panel__task-title">Titulo de la tarea</h3>
          <p className="edit-panel__task-description">
            Descripcion de la tarea, aqui va toda esa info
          </p>
        </div>
        <div className="edit-panel__task-comment-container">
          <img
            className="edit-panel__task-comment-icon"
            src={commentIcon}
            alt=""
          />
          <p className="edit-panel__task-comment">Comentario de la tarea</p>
        </div>
        <section className="edit-panel__task-filters">
          <div className="edit-panel__task-filters-item">
            <img src={tagIcon} alt="Icono de tag" />
            <p>Tag 1</p>
          </div>
          <div className="edit-panel__task-filters-item">
            <img src={categoryIcon} alt="Icono de tag" />
            <p>Category 1</p>
          </div>
        </section>
      </section>
      <section className="edit-panel__options-container">
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={priorityIcon}
            alt="Icono de prioridad"
          />
          <p>Prioridad</p>
        </div>
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={tagIcon}
            alt="Icono de tag"
          />
          <p>Tags</p>
        </div>
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={categoryIcon}
            alt="Icono de categoria"
          />
          <p>Categorias</p>
        </div>
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={deleteIcon}
            alt="Icono de eliminar"
          />
          <p>Eliminar</p>
        </div>
      </section>
    </div>
  );
}
export default EditPanel;
