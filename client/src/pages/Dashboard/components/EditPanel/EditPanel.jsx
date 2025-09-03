import "./EditPanel.css";
import { useState, useEffect, useRef } from "react";
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
import { getTagsInTask } from "../../../../features/tags/services/tagsServices";
import { getCategoriesInTask } from "../../../../features/categories/services/categoriesServices";
import { useTaskData } from "../../../../features/tasks/services/useTaskData";
import useAutoGrowTextarea from "../../../../core/hooks/useAutoGrowTextarea";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton";
import { TaskCategoriesList } from "../../../../features/categories/data/TaskCategoriesList";
import { getAllTags } from "../../../../features/tags/services/tagsServices";
import { getAllCategories } from "../../../../features/categories/services/categoriesServices";
import useFetchAllData from "../../../../core/hooks/useFetchAllData";

function EditPanel({ isOpen, onClose, handleOpenEditPanel, task }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [originalTask, setOriginalTask] = useState(null);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const commentRef = useRef(null);

  useAutoGrowTextarea(titleRef, title);
  useAutoGrowTextarea(descriptionRef, description);
  useAutoGrowTextarea(commentRef, comment);

  const allUserTags = useFetchAllData(getAllTags);
  const allUserCategories = useFetchAllData(getAllCategories);
  const tagsInTask = useTaskData(task, getTagsInTask);
  const categoriesInTask = useTaskData(task, getCategoriesInTask);

  const handleResetTask = () => {
    if (originalTask) {
      setTitle(originalTask.title || "");
      setDescription(originalTask.description || "");
      setComment(originalTask.comment || "Comentario de la tarea");
    }
  };

  useEffect(() => {
    if (task) {
      setOriginalTask(task);
      setTitle(task.title || "Titulo por defecto");
      setDescription(task.description || "Descripcion por defecto");
      setComment("Comentario de la tarea");
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
                {tagsInTask[task?.id]?.length > 0 &&
                  tagsInTask[task.id].map((tag) => (
                    <div className="edit-panel__task-filters-item" key={tag.id}>
                      <img
                        className="edit-panel__task__filters-item__icon"
                        src={tagIcon}
                        alt="Icono de tag"
                      />
                      <p>{tag.name}</p>
                    </div>
                  ))}
                {categoriesInTask[task?.id]?.length > 0 &&
                  categoriesInTask[task.id].map((category) => (
                    <div
                      className="edit-panel__task-filters-item"
                      key={category.id}
                    >
                      <img
                        className="edit-panel__task__filters-item__icon"
                        src={categoryIcon}
                        alt="Icono de categoría"
                      />
                      <p>{category.name}</p>
                    </div>
                  ))}
              </section>
              <section className="edit-panel__add-filter-container">
                <DropdownButton
                  buttonText="Tags"
                  buttonIcon={tagItemIcon}
                  itemList={allUserTags}
                  itemListIcon={tagItemIcon}
                />
                <span className="edit-panel__add-filter-separator"></span>
                <DropdownButton
                  buttonText="Categorias"
                  buttonIcon={categoryItemIcon}
                  itemList={allUserCategories}
                  itemListIcon={categoryItemIcon}
                />
              </section>
            </section>
            <section className="edit-panel__task-main">
              <div className="edit-panel__task-header">
                <textarea
                  ref={titleRef}
                  type="text"
                  className="edit-panel__task-title"
                  value={title}
                  rows="1"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <img
                  className="edit-panel__task-priority"
                  src={priority1FullIcon}
                  alt="Icono de prioridad"
                />
              </div>
              <textarea
                ref={descriptionRef}
                type="text"
                className="edit-panel__task-description"
                placeholder={description}
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </section>
            <div className="edit-panel__task-comment-container">
              <img
                className="edit-panel__task-comment-icon"
                src={commentIcon}
                alt=""
              />
              <textarea
                ref={commentRef}
                type="text"
                className="edit-panel__task-comment"
                placeholder={comment}
                rows="1"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
          </section>
          <section className="edit-panel__options-container">
            <div
              className="edit-panel__option"
              role="button"
              onClick={handleResetTask}
            >
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
