import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import "./AddTaskModal.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import DropdownButton from "../../../../core/components/DropdownButton/DropdownButton.jsx";
import { TaskCategoriesList } from "../../../categories/data/TaskCategoriesList.js";
import { TaskPrioritiesList } from "../../../priorities/data/TaskPrioritiesList.js";
import { TaskTagsList } from "../../../tags/data/TaskTagsList.js";
import categoryIcon from "../../assets/images/SectionIcon/categoryIcon.png";
import priorityIcon from "../../assets/images/SectionIcon/priorityIcon.png";
import tagIcon from "../../assets/images/SectionIcon/tagIcon.png";
import dateIcon from "../../assets/images/SectionIcon/dateIcon.png";
import DropdownWrapper from "../../../../core/components/DropdownWrapper/DropdownWrapper.jsx";
import { createTask } from "../../services/tasksServices.js";

const AddTaskModal = ({ onClose, AddTaskModalIsOpen, onTaskAdded }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [title, setTitle] = useState("Titulo de la tarea");
  const [description, setDescription] = useState("Descripcion de la tarea.");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddTask = async ({ title, description }) => {
    try {
      await createTask({
        title,
        description,
      });
      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.error("Error al crear la tarea:", error);
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
          onClick={onClose}
        >
          <div className="task-modal" onClick={(e) => e.stopPropagation()}>
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
            <section className="task-modal-filters">
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
              />
              <DropdownButton
                buttonText="Categoria"
                buttonIcon={categoryIcon}
                itemList={TaskCategoriesList}
              />
              <DropdownButton
                buttonText="Tags"
                buttonIcon={tagIcon}
                itemList={TaskTagsList}
              />
            </section>
            <section className="task-modal-buttons">
              <button
                onClick={() => handleAddTask({ title, description })}
                className="task-modal-add-btn"
              >
                Añadir tarea
              </button>
              <button className="task-modal-second-btn" onClick={onClose}>
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
