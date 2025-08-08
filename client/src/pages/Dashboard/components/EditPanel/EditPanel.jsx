import "./EditPanel.css";
import todayIcon from "../../assets/images/todayIcon.png";
import commentIcon from "../../assets/images/commentIcon.png";
import priority1FullIcon from "../../../../features/tasks/assets/images/ItemIcon/priority1FullIcon.png";
import tagIcon from "../../../../features/tasks/assets/images/SectionIcon/tagIcon.png";
import categoryIcon from "../../../../features/tasks/assets/images/SectionIcon/categoryIcon.png";
import deleteIcon from "../../../../features/tasks/assets/images/SectionIcon/deleteIcon.png";
import closeIcon from "../../../../features/tasks/assets/images/SectionIcon/closeIcon.png";

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
        <section className="edit-panel__task-main">
          <div className="edit-panel__task-header">
            <h3 className="edit-panel__task-title">Titulo de la tarea</h3>
            <img
              className="edit-panel__task-icon"
              src={priority1FullIcon}
              alt="Icono de prioridad"
            />
          </div>
          <p className="edit-panel__task-description">
            Descripcion de la tarea, aqui va toda esa info
          </p>
        </section>
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
            src={tagIcon}
            alt="Icono de tag"
          />
          <p>Tags</p>
        </div>
        <span className="edit-panel__options-separator"></span>
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={categoryIcon}
            alt="Icono de categoria"
          />
          <p>Categorias</p>
        </div>
        <span className="edit-panel__options-separator"></span>
        <div className="edit-panel__options">
          <img
            className="edit-panel__options-icon"
            src={deleteIcon}
            alt="Icono de eliminar"
          />
          <p>Eliminar</p>
        </div>
      </section>
      <div className="edit-panel__close-container">
        <img className="edit-panel__close-icon" src={closeIcon} alt="" />
        <p>Cerrar</p>
      </div>
    </div>
  );
}
export default EditPanel;
