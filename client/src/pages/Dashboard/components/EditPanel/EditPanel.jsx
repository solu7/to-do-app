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
import {
  getAllTags,
  getTagsInTask,
  assignTagToTask,
  removeTagFromTask,
} from "../../../../features/filters/tags/services/tagsServices";
import {
  getAllCategories,
  getCategoriesInTask,
  assignCategoryToTask,
  removeCategoryFromTask,
} from "../../../../features/filters/categories/services/categoriesServices";
import { toggleTaskCompletion } from "../../../../features/tasks/services/tasksServices";
import { useTasks } from "../../../../context/TaskContext";
import { useTaskData } from "../../../../features/tasks/services/useTaskData";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton";
import useFetchAllData from "../../../../core/hooks/useFetchAllData";
import { useTaskItemAction } from "../../../../features/tasks/hooks/useTaskItemAction";
import { useTaskEditPanel } from "../Sidebar/hooks/useTaskEditPanel";
import { useTaskActions } from "../../../../features/tasks/hooks/useTaskActions";
import { useTaskPriority } from "../../../../features/filters/priorities/hooks/useTaskPriority";
import { TaskPrioritiesList } from "../../../../features/filters/priorities/data/TaskPrioritiesList";
import AddDueDateModal from "../../../../features/tasks/components/AddDueDateModal/AddDueDateModal";
import { useModal } from "../../../../features/tasks/hooks/useModal";
import { useTaskDueDate } from "../../../../features/tasks/date/hooks/useTaskDueDate";

function EditPanel({ isOpen, onClose, handleOpenEditPanel, task }) {
  const addDueDateModal = useModal();
  const {
    fetchCompletedTasks,
    fetchInboxTasks,
    fetchAllTasks,
    fetchTodayTasks,
    fetchUpcomingTasks,
    updateTaskCompletion,
  } = useTasks();
  const {
    panelWidth,
    titleRef,
    descriptionRef,
    commentRef,
    resizeHandleRef,
    handleResetTask,
    title,
    setTitle,
    description,
    setDescription,
    comment,
    setComment,
  } = useTaskEditPanel(task);

  const isCompleted = task?.completed === 1;

  const allUserTags = useFetchAllData(getAllTags);
  const allUserCategories = useFetchAllData(getAllCategories);

  const { data: tagsInTask, refetch: refetchTagsInTask } = useTaskData(
    task,
    getTagsInTask
  );
  const { data: categoriesInTask, refetch: refetchCategoriesInTask } =
    useTaskData(task, getCategoriesInTask);

  const { handleTaskItemAction } = useTaskItemAction();

  const handleAssignTag = (tag) => {
    handleTaskItemAction({
      task: task,
      item: tag,
      action: assignTagToTask,
      refetch: refetchTagsInTask,
      payloadKey: "tagId",
    });
  };

  const handleRemoveTag = (tag) => {
    handleTaskItemAction({
      task: task,
      item: tag,
      action: removeTagFromTask,
      refetch: refetchTagsInTask,
      payloadKey: "tagId",
    });
  };

  const handleAssignCategory = (category) => {
    handleTaskItemAction({
      task: task,
      item: category,
      action: assignCategoryToTask,
      refetch: refetchCategoriesInTask,
      payloadKey: "categoryId",
    });
  };

  const handleRemoveCategory = (category) => {
    handleTaskItemAction({
      task: task,
      item: category,
      action: removeCategoryFromTask,
      refetch: refetchCategoriesInTask,
      payloadKey: "categoryId",
    });
  };

  const { priorityIcon, handleSavePriority } = useTaskPriority(task);

  const handleSetPriority = (selectedItem) => {
    handleSavePriority(task.id, selectedItem.value);
    fetchAllTasks();
    isCompleted ? fetchCompletedTasks() : fetchInboxTasks();
  };

  const handleToggleCompletion = async () => {
    const newCompletedState = task?.completed === 0;

    updateTaskCompletion(task.id, newCompletedState);

    try {
      await handleTaskItemAction({
        task: task,
        action: toggleTaskCompletion,
        refetch: fetchCompletedTasks,
      });
      fetchTodayTasks();
      fetchInboxTasks();
      fetchUpcomingTasks();
      fetchAllTasks();
    } catch (error) {
      console.error("Error al alternar el estado de completado:", error);
    }
  };
  const panelClasses = `edit-panel ${isOpen ? "" : "closed"}${
    isCompleted ? "completed" : ""
  }`;

  const { handleSaveTask, handleDeleteTask } = useTaskActions(
    isCompleted ? fetchCompletedTasks : fetchInboxTasks,
    onClose
  );

  const { selectedDueDate, handleDueDateChange, formattedDateText } =
    useTaskDueDate(task);

  const onDueDateChangeAndRefresh = async (date) => {
    await handleDueDateChange(date);

    fetchTodayTasks();
    fetchInboxTasks();
    fetchUpcomingTasks();
    fetchAllTasks();
  };
  return (
    <div
      className={panelClasses}
      ref={resizeHandleRef}
      style={{ width: panelWidth + "px" }}
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
                onChange={handleToggleCompletion}
              />
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
                      <img
                        className="edit-panel__task-filters-item__close-icon"
                        src={closeIcon}
                        alt="Icono de eliminar tag"
                        onClick={() => handleRemoveTag(tag)}
                      />
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
                      <img
                        className="edit-panel__task-filters-item__close-icon"
                        src={closeIcon}
                        alt="Icono de eliminar categorias"
                        onClick={() => handleRemoveCategory(category)}
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
                  onItemClick={handleAssignTag}
                />
                <span className="edit-panel__add-filter-separator"></span>
                <DropdownButton
                  buttonText="Categorias"
                  buttonIcon={categoryItemIcon}
                  itemList={allUserCategories}
                  itemListIcon={categoryItemIcon}
                  onItemClick={handleAssignCategory}
                />
              </section>
            </section>
            <section className="edit-panel__task-main">
              <div className="edit-panel__task-header">
                <textarea
                  id="edit-panel__task-title"
                  ref={titleRef}
                  type="text"
                  className={`edit-panel__task-title ${
                    isCompleted ? "text--completed" : ""
                  }`}
                  value={title}
                  rows="1"
                  onChange={(e) => setTitle(e.target.value)}
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
                id="edit-panel__task-description"
                ref={descriptionRef}
                type="text"
                className={`edit-panel__task-description ${
                  isCompleted ? "text--completed" : ""
                }`}
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
                id="edit-panel__task-comment"
                ref={commentRef}
                type="text"
                className="edit-panel__task-comment"
                placeholder="Escribe un comentario..."
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
