import "./EditPanel.css";
import "react-datepicker/dist/react-datepicker.css";
import DropdownWrapper from "../../../../core/components/DropdownWrapper/DropdownWrapper";
import dateIcon from "../../../../features/tasks/assets/images/SectionIcon/dateIcon.png";
import commentIcon from "../../assets/images/commentIcon.png";
import tagIcon from "../../../../features/tasks/assets/images/SectionIcon/tagIcon.png";
import tagItemIcon from "../../../../features/tasks/assets/images/ItemIcon/tagItemIcon.png";
import categoryIcon from "../../../../features/tasks/assets/images/SectionIcon/categoryIcon.png";
import categoryItemIcon from "../../../../features/tasks/assets/images/ItemIcon/categoryItemIcon.png";
import deleteIcon from "../../../../features/tasks/assets/images/SectionIcon/deleteIcon.png";
import closeIcon from "../../../../features/tasks/assets/images/SectionIcon/closeIcon.png";
import openIcon from "../../assets/images/openIcon.png";
import saveIcon from "../../assets/images/saveIcon.png";
import resetIcon from "../../assets/images/resetIcon.png";
import { useEditPanelActions } from "../../../../features/tasks/hooks/useEditPanelActions";
import { useTasks } from "../../../../context/TaskContext";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton";
import { useFilters } from "../../../../context/FilterContext";
import { useCreateFilter } from "../../../../features/filters/hooks/useCreateFilter";
import CreateFilterModal from "../../../../features/filters/components/CreateFilterModal/CreateFilterModal";
import { useTaskEditPanel } from "../Sidebar/hooks/useTaskEditPanel";
import { useTaskActions } from "../../../../features/tasks/hooks/useTaskActions";
import { useTaskPriority } from "../../../../features/filters/priorities/hooks/useTaskPriority";
import { TaskPrioritiesList } from "../../../../features/filters/priorities/data/TaskPrioritiesList";
import AddDueDateModal from "../../../../features/tasks/components/AddDueDateModal/AddDueDateModal";
import { useModal } from "../../../../features/tasks/hooks/useModal";
import { useTaskDueDate } from "../../../../features/tasks/hooks/useTaskDueDate";
import { useResizer } from "../../../../core/hooks/useResizer";

function EditPanel({ isOpen, onClose, handleOpenEditPanel, task }) {
  const addDueDateModal = useModal();
  const { refreshAllLists } = useTasks();
  const {
    titleRef,
    descriptionRef,
    commentRef,
    handleResetTask,
    title,
    setTitle,
    description,
    setDescription,
    comment,
    setComment,
    handleInputChange,
  } = useTaskEditPanel(task);

  const {
    tags: allUserTags,
    categories: allUserCategories,
    removeTag,
    removeCategory,
    refreshFilters,
  } = useFilters();

  const { modalConfig, openModal, closeModal, handleCreate } =
    useCreateFilter(refreshFilters);

  const tagsInTask = task?.tags || [];
  const categoriesInTask = task?.categories || [];

  const { actions } = useEditPanelActions(task);

  const isCompleted = task?.completed === 1;

  const { priorityIcon, handleSavePriority } = useTaskPriority(task);

  const handleSetPriority = (selectedItem) => {
    handleSavePriority(task.id, selectedItem.value);
    refreshAllLists();
  };

  const {
    elementWidth: elementWidth,
    elementRef: resizeHandleRef,
    isResizing,
    handleMouseDown,
  } = useResizer(400, 0.98);

  const panelClasses = `edit-panel 
  ${isOpen ? "open" : "closed"} 
  ${isResizing ? "resizing" : ""}
  ${isCompleted ? "completed" : ""}`;

  const { handleSaveTask, handleDeleteTask } = useTaskActions(
    refreshAllLists,
    onClose,
  );

  const { selectedDueDate, handleDueDateChange, formattedDateText } =
    useTaskDueDate(task);

  const onDueDateChangeAndRefresh = async (date) => {
    await handleDueDateChange(date);
    refreshAllLists();
  };
  return (
    <div
      className={panelClasses}
      ref={resizeHandleRef}
      onMouseDown={isOpen ? handleMouseDown : undefined}
      style={{ "--panel-width": `${elementWidth}px` }}
    >
      {isOpen && (
        <div className="edit-panel__content-wrapper">
          <section className="edit-panel__items">
            <div className="edit-panel__date-container">
              <DropdownWrapper
                buttonIcon={dateIcon}
                buttonText={formattedDateText}
                onClick={addDueDateModal.open}
              />
              <AddDueDateModal
                task={task}
                onClose={addDueDateModal.close}
                isOpen={addDueDateModal.isOpen}
                selectedDueDate={selectedDueDate}
                handleDueDateChange={onDueDateChangeAndRefresh}
                formattedDateText={formattedDateText}
              />
            </div>
            <label
              htmlFor="task-completed"
              className="edit-panel__completed-container"
            >
              <input
                id="task-completed"
                className="edit-panel__completed"
                type="checkbox"
                checked={task?.completed === 1}
                onChange={actions.toggleCompletion}
              />
              <span className="edit-panel__completed-checkmark"></span>
            </label>
          </section>
          <section className="edit-panel__task">
            <section className="edit-panel__filters">
              <section className="edit-panel__task-filters">
                {tagsInTask.map((tag) => (
                  <div className="edit-panel__task-filters-item" key={tag.id}>
                    <img
                      className="edit-panel__task__filters-item__icon"
                      src={tagIcon}
                      alt="Icono de tag"
                    />
                    <p>{tag.name}</p>
                    <img
                      className="edit-panel__task-filters-item__close-icon"
                      src={closeIcon}
                      alt="Icono de eliminar tag"
                      onClick={() => actions.removeTag(tag)}
                    />
                  </div>
                ))}
                {categoriesInTask.map((category) => (
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
                    <img
                      className="edit-panel__task-filters-item__close-icon"
                      src={closeIcon}
                      alt="Icono de eliminar categorias"
                      onClick={() => actions.removeCategory(category)}
                    />
                  </div>
                ))}
              </section>
              <section className="edit-panel__add-filter-container">
                <DropdownButton
                  buttonText="Tags"
                  buttonIcon={tagItemIcon}
                  itemList={allUserTags}
                  itemListIcon={tagItemIcon}
                  onItemClick={actions.assignTag}
                  onAddClick={(e) => openModal("tag", e)}
                  onRemoveClick={removeTag}
                  keepOpen={modalConfig.isOpen && modalConfig.type === "tag"}
                />
                <span className="edit-panel__add-filter-separator"></span>
                <DropdownButton
                  buttonText="Categorias"
                  buttonIcon={categoryItemIcon}
                  itemList={allUserCategories}
                  itemListIcon={categoryItemIcon}
                  onItemClick={actions.assignCategory}
                  onAddClick={(e) => openModal("category", e)}
                  onRemoveClick={removeCategory}
                  keepOpen={
                    modalConfig.isOpen && modalConfig.type === "category"
                  }
                />
                <CreateFilterModal
                  {...modalConfig}
                  onClose={closeModal}
                  onClick={handleCreate}
                />
              </section>
            </section>
            <section className="edit-panel__task-main">
              <div className="edit-panel__task-header">
                <textarea
                  spellCheck="false"
                  id="edit-panel__task-title"
                  ref={titleRef}
                  type="text"
                  className={`edit-panel__task-title ${
                    isCompleted ? "text--completed" : ""
                  }`}
                  value={title}
                  rows="1"
                  onChange={handleInputChange(setTitle, titleRef)}
                />
                {priorityIcon && (
                  <DropdownButton
                    buttonIcon={priorityIcon}
                    itemList={TaskPrioritiesList}
                    onItemClick={handleSetPriority}
                  />
                )}
              </div>
              <textarea
                spellCheck="false"
                id="edit-panel__task-description"
                ref={descriptionRef}
                type="text"
                className={`edit-panel__task-description ${
                  isCompleted ? "text--completed" : ""
                }`}
                rows="2"
                value={description}
                onChange={handleInputChange(setDescription, descriptionRef)}
              />
            </section>
            <div className="edit-panel__task-comment-container">
              <img
                className="edit-panel__task-comment-icon"
                src={commentIcon}
                alt=""
              />
              <textarea
                spellCheck="false"
                id="edit-panel__task-comment"
                ref={commentRef}
                type="text"
                className="edit-panel__task-comment"
                placeholder="Escribe un comentario..."
                rows="1"
                value={comment}
                onChange={handleInputChange(setComment, commentRef)}
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
            <div
              className="edit-panel__option"
              role="button"
              onClick={() => handleSaveTask(task, title, description)}
            >
              <img
                className="edit-panel__option-icon"
                src={saveIcon}
                alt="Icono de guardar"
              />
              <p>Guardar</p>
            </div>
            <div
              className="edit-panel__option"
              onClick={() => handleDeleteTask(task.id)}
            >
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
