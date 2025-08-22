import "./EditPanel.css";
import { useState, useEffect } from "react";
import todayIcon from "../../assets/images/todayIcon.png";
import commentIcon from "../../assets/images/commentIcon.png";
import priority1FullIcon from "../../../../features/tasks/assets/images/ItemIcon/priority1FullIcon.png";
import tagIcon from "../../../../features/tasks/assets/images/SectionIcon/tagIcon.png";
import tagItemIcon from "../../../../features/tasks/assets/images/ItemIcon/tagItemIcon.png";
import categoryIcon from "../../../../features/tasks/assets/images/SectionIcon/categoryIcon.png";
import categoryItemIcon from "../../../../features/tasks/assets/images/ItemIcon/categoryItemIcon.png";
import deleteIcon from "../../../../features/tasks/assets/images/SectionIcon/deleteIcon.png";
import closeIcon from "../../../../features/tasks/assets/images/SectionIcon/closeIcon.png";
import openIcon from "../../assets/images/openIcon.png";
import saveIcon from "../../assets/images/saveIcon.png";
import resetIcon from "../../assets/images/resetIcon.png";

function EditPanel({ isOpen, onClose, handleOpenEditPanel, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (task) {
      setTitle(task.title || "Titulo por defecto");
      setDescription(task.description || "Descripcion por defecto");
    }
  }, [task]);
  return (
    <div className="edit-panel">
      {isOpen && (
        <div className="edit-panel__content-wrapper">
          <section className="edit-panel__items">
            <div className="edit-panel__date-container">
              <img
                className="edit-panel__date-icon"
                src={todayIcon}
                alt="Icono de hoy"
              />
              <p className="edit-panel__date">
                Fecha que le pusiste a la tarea
              </p>
            </div>
            <label htmlFor="" className="edit-panel__completed-container">
              <input className="edit-panel__completed" type="checkbox" />
              <span className="edit-panel__completed-checkmark"></span>
            </label>
          </section>
          <section className="edit-panel__task">
            <section className="edit-panel__filters">
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
              <section className="edit-panel__add-filter-container">
                <div className="edit-panel__add-filter">
                  <img
                    className="edit-panel__add-filter-icon"
                    src={tagItemIcon}
                    alt="Icono de tag"
                  />
                  <p>Agregar Tags</p>
                </div>
                <span className="edit-panel__add-filter-separator"></span>
                <div className="edit-panel__add-filter">
                  <img
                    className="edit-panel__add-filter-icon"
                    src={categoryItemIcon}
                    alt="Icono de categoria"
                  />
                  <p>Agregar Categorias</p>
                </div>
              </section>
            </section>
            <section className="edit-panel__task-main">
              <div className="edit-panel__task-header">
                <textarea
                  type="text"
                  className="edit-panel__task-title"
                  placeholder={title}
                  rows="1"
                />
                <img
                  className="edit-panel__task-priority"
                  src={priority1FullIcon}
                  alt="Icono de prioridad"
                />
              </div>
              <textarea
                type="text"
                className="edit-panel__task-description"
                placeholder={description}
                rows="2"
              />
            </section>
            <div className="edit-panel__task-comment-container">
              <img
                className="edit-panel__task-comment-icon"
                src={commentIcon}
                alt=""
              />
              <textarea
                type="text"
                className="edit-panel__task-comment"
                placeholder="Comentario de la tarea"
                rows="1"
              />
            </div>
          </section>
          <section className="edit-panel__options-container">
            <div className="edit-panel__option">
              <img
                className="edit-panel__option-icon"
                src={resetIcon}
                alt="Icono de resetear"
              />
              <p>Restablecer</p>
            </div>
            <div className="edit-panel__option">
              <img
                className="edit-panel__option-icon"
                src={saveIcon}
                alt="Icono de guardar"
              />
              <p>Guardar</p>
            </div>
            <div className="edit-panel__option">
              <img
                className="edit-panel__option-icon"
                src={deleteIcon}
                alt="Icono de borrar"
              />
              <p>Borrar</p>
            </div>
          </section>
        </div>
      )}
      <div
        className="edit-panel__close-container"
        onClick={isOpen ? onClose : handleOpenEditPanel}
      >
        <img
          className="edit-panel__close-icon"
          src={isOpen ? closeIcon : openIcon}
          alt="Icono de abrir o cerrar el panel"
        />
        {isOpen && <p>Cerrar</p>}
      </div>
    </div>
  );
}
export default EditPanel;
