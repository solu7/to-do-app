import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import "./AddTaskModal.css";
import { useState } from "react";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton.jsx";
import { TaskPrioritiesList } from "../../../filters/priorities/data/TaskPrioritiesList.js";
import categoryIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import priorityListIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import dateIcon from "../../assets/images/SectionIcon/dateIcon.png";
import closeIcon from "../../assets/images/SectionIcon/closeIcon.png";
import DropdownWrapper from "../../../../core/components/DropdownWrapper/DropdownWrapper.jsx";
import AddDueDateModal from "../AddDueDateModal/AddDueDateModal.jsx";
import { useModal } from "../../hooks/useModal.js";
import { createTask } from "../../services/tasksServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import { assignTagToTask } from "../../../filters/tags/services/tagsServices.js";
import { assignCategoryToTask } from "../../../filters/categories/services/categoriesServices.js";
import { useTaskItemRelations } from "../../hooks/useTaskItemRelations.js";
import { useTaskPriority } from "../../../filters/priorities/hooks/useTaskPriority.js";
import { useTaskDueDate } from "../../hooks/useTaskDueDate.js";
import { useCreateFilter } from "../../../filters/hooks/useCreateFilter.js";
import { useFilters } from "../../../../context/FilterContext.jsx";
import CreateFilterModal from "../../../filters/components/CreateFilterModal/CreateFilterModal.jsx";

const AddTaskModal = ({ onClose, isOpen }) => {
  const [title, setTitle] = useState("Titulo de la tarea");
  const [description, setDescription] = useState("Descripcion de la tarea.");
  const addDueDateModal = useModal();

  const {
    tags: allUserTags,
    categories: allUserCategories,
    removeTag,
    removeCategory,
    refreshFilters,
  } = useFilters();

  const { modalConfig, openModal, closeModal, handleCreate } =
    useCreateFilter(refreshFilters);

  const { refreshAllLists } = useTasks();

  const {
    selectedPriority,
    handleSetPriority,
    handleSavePriority,
    priorityIcon,
  } = useTaskPriority();
  const {
    selectedDueDate,
    handleDueDateChange,
    formattedDateText,
    formattedDateModalText,
    handleSaveDueDate,
  } = useTaskDueDate();

  const {
    selectedTags,
    selectedCategories,
    handleAssignTag,
    handleAssignCategory,
    handleRemoveTag,
    handleRemoveCategory,
    resetRelations,
  } = useTaskItemRelations();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const closeAndResetRelations = () => {
    resetRelations();
    handleSetPriority(null);
    handleDueDateChange(null);
    setTitle("Titulo de la tarea");
    setDescription("Descripcion de la tarea.");
    onClose();
  };

  const handleAddTask = async () => {
    try {
      const newTask = await createTask({ title, description });
      const taskId = newTask.id;

      const assignPromises = [];

      selectedTags.forEach((tag) =>
        assignPromises.push(assignTagToTask({ taskId, tagId: tag.id }))
      );
      selectedCategories.forEach((category) =>
        assignPromises.push(
          assignCategoryToTask({ taskId, categoryId: category.id })
        )
      );
      if (selectedPriority) {
        assignPromises.push(handleSavePriority(taskId, selectedPriority.value));
      }
      if (selectedDueDate) {
        assignPromises.push(handleSaveDueDate(taskId, selectedDueDate));
      }

      await Promise.allSettled(assignPromises);
      refreshAllLists();
      closeAndResetRelations();
      onClose();
    } catch (error) {
      console.error("Error al crear y/o asignar la tarea:", error);
    }
  };
  return (
    <AnimatePresence>
      {!!isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeAndResetRelations}
        >
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="task-modal-filters">
              {selectedTags.map((tag) => (
                <div className="task-modal-filters-item" key={tag.id}>
                  <img
                    className="task-modal-filters-item__icon"
                    src={tagIcon}
                    alt="Icono de tag"
                  />
                  <p>{tag.name}</p>
                  <img
                    className="task-modal-filters-item__close-icon"
                    src={closeIcon}
                    alt="Icono de eliminar tag"
                    onClick={() => handleRemoveTag(tag.id)}
                  />
                </div>
              ))}
              {selectedCategories.map((category) => (
                <div className="task-modal-filters-item" key={category.id}>
                  <img
                    className="task-modal-filters-item__icon"
                    src={categoryIcon}
                    alt="Icono de categoria"
                  />
                  <p>{category.name}</p>
                  <img
                    className="task-modal-filters-item__close-icon"
                    src={closeIcon}
                    alt="Icono de eliminar categoria"
                    onClick={() => handleRemoveCategory(category.id)}
                  />
                </div>
              ))}
            </div>

            <section className="task-modal__header">
              <div className="task-modal__header-date">
                <img src={dateIcon} alt="Icono de fecha" />
                <p>{formattedDateText}</p>
              </div>
              <div className="task-modal__header-main">
                <textarea
                  className="task-modal-input title"
                  onChange={handleTitleChange}
                  value={title}
                  placeholder={title}
                  rows="1"
                />
                {selectedPriority && (
                  <img
                    className="task-modal-priority-icon"
                    src={priorityIcon}
                    alt={`Prioridad ${selectedPriority.value}`}
                  />
                )}
              </div>
              <textarea
                className="task-modal-input desc"
                onChange={handleDescriptionChange}
                value={description}
                placeholder={description}
                rows="1"
              />
            </section>
            <section className="task-modal__select-filters">
              <DropdownWrapper
                buttonIcon={dateIcon}
                buttonText={formattedDateModalText}
                onClick={addDueDateModal.open}
              />
              <AddDueDateModal
                onClose={addDueDateModal.close}
                isOpen={addDueDateModal.isOpen}
                selectedDueDate={selectedDueDate}
                handleDueDateChange={handleDueDateChange}
                formattedDateText={formattedDateText}
              />
              <DropdownButton
                buttonText="Prioridad"
                buttonIcon={priorityListIcon}
                itemList={TaskPrioritiesList}
                onItemClick={handleSetPriority}
              />
              <DropdownButton
                buttonText="Categoria"
                buttonIcon={categoryIcon}
                itemList={allUserCategories}
                itemListIcon={categoryIcon}
                onItemClick={handleAssignCategory}
                onAddClick={(e) => openModal("category", e)}
                onRemoveClick={removeCategory}
                keepOpen={modalConfig.isOpen && modalConfig.type === "category"}
              />
              <DropdownButton
                buttonText="Tags"
                buttonIcon={tagIcon}
                itemList={allUserTags}
                itemListIcon={tagIcon}
                onItemClick={handleAssignTag}
                onAddClick={(e) => openModal("tag", e)}
                onRemoveClick={removeTag}
                keepOpen={modalConfig.isOpen && modalConfig.type === "tag"}
              />
              <CreateFilterModal
                {...modalConfig}
                onClose={closeModal}
                onClick={handleCreate}
              />
            </section>
            <section className="task-modal-buttons">
              <button onClick={handleAddTask} className="task-modal-add-btn">
                Añadir tarea
              </button>
              <button
                className="task-modal-second-btn"
                onClick={closeAndResetRelations}
              >
                Cancelar
              </button>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AddTaskModal;
