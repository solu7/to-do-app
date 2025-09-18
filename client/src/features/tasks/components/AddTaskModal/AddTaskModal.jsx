import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import "./AddTaskModal.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton.jsx";
import { TaskPrioritiesList } from "../../../priorities/data/TaskPrioritiesList.js";
import categoryIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import priorityIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import dateIcon from "../../assets/images/SectionIcon/dateIcon.png";
import closeIcon from "../../assets/images/SectionIcon/closeIcon.png";
import DropdownWrapper from "../../../../core/components/DropdownWrapper/DropdownWrapper.jsx";
import { createTask } from "../../services/tasksServices.js";
import { useTasks } from "../../../../context/TaskContext.jsx";
import {
  getAllTags,
  assignTagToTask,
} from "../../../tags/services/tagsServices.js";
import {
  getAllCategories,
  assignCategoryToTask,
} from "../../../categories/services/categoriesServices.js";
import useFetchAllData from "../../../../core/hooks/useFetchAllData.js";
import { useTaskItemRelations } from "../../hooks/useTaskItemRelations.js";

const AddTaskModal = ({ onClose, AddTaskModalIsOpen }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [title, setTitle] = useState("Titulo de la tarea");
  const [description, setDescription] = useState("Descripcion de la tarea.");
  const { fetchTasks } = useTasks();
  const allUserTags = useFetchAllData(getAllTags);
  const allUserCategories = useFetchAllData(getAllCategories);

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
    onClose();
  };

  const handleAddTask = async () => {
    try {
      const newTask = await createTask({ title, description });
      const taskId = newTask.id;

      const assignTagsPromises = selectedTags.map((tag) =>
        assignTagToTask({ taskId, tagId: tag.id })
      );
      const assignCategoriesPromises = selectedCategories.map((category) =>
        assignCategoryToTask({ taskId, categoryId: category.id })
      );

      await Promise.allSettled([
        ...assignTagsPromises,
        ...assignCategoriesPromises,
      ]);

      fetchTasks();
      closeAndResetRelations();
    } catch (error) {
      console.error("Error al crear y/o asignar la tarea:", error);
    }
  };
  return (
    <AnimatePresence>
      {!!AddTaskModalIsOpen && (
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

            <section className="task-modal-main">
              <textarea
                className="task-modal-input title"
                onChange={handleTitleChange}
                value={title}
                placeholder={title}
                rows="1"
              />
              <textarea
                className="task-modal-input desc"
                onChange={handleDescriptionChange}
                value={description}
                placeholder={description}
                rows="1"
              />
            </section>
            <section className="task-modal__select-filters">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                locale={es}
                dateFormat="dd/MM/yyyy"
                showOutsideDays={false}
                customInput={
                  <DropdownWrapper buttonIcon={dateIcon} buttonText="Fecha" />
                }
              />
              <DropdownButton
                buttonText="Prioridad"
                buttonIcon={priorityIcon}
                itemList={TaskPrioritiesList}
                itemListIcon={priorityIcon}
              />
              <DropdownButton
                buttonText="Categoria"
                buttonIcon={categoryIcon}
                itemList={allUserCategories}
                itemListIcon={categoryIcon}
                onItemClick={handleAssignCategory}
              />
              <DropdownButton
                buttonText="Tags"
                buttonIcon={tagIcon}
                itemList={allUserTags}
                itemListIcon={tagIcon}
                onItemClick={handleAssignTag}
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
