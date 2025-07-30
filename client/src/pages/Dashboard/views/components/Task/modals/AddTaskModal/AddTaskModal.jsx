import "react-datepicker/dist/react-datepicker.css";
import "./AddTaskModal.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import DropdownButton from "../utils/DropdownButton/DropdownButton.jsx";
import { TaskCategoriesList } from "../../assets/data/TaskCategoriesList.js";
import { TaskPrioritiesList } from "../../assets/data/TaskPrioritiesList.js";
import categoryIcon from "../../assets/images/categoryIcon.png";

const AddTaskModal = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="task-modal">
      <section className="task-modal-main">
        <input
          className="task-modal-input title"
          type="text"
          placeholder="Titulo de la tarea"
        />
        <input
          className="task-modal-input desc"
          type="text"
          placeholder="Descripcion"
        />
      </section>
      <section className="task-modal-filters">
        <div className="task-modal-filter">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            locale={es}
            dateFormat="dd/MM/yyyy"
            customInput={<button className="modal-filter-button">Fecha</button>}
          />
        </div>
        <DropdownButton
          buttonText="Prioridad"
          buttonIcon={categoryIcon}
          itemList={TaskPrioritiesList}
        />
        <DropdownButton
          buttonText="Categoria"
          buttonIcon={categoryIcon}
          itemList={TaskCategoriesList}
        />
      </section>
      <section className="task-modal-buttons">
        <button className="task-modal-add-btn">Añadir tarea</button>
        <button className="task-modal-second-btn">Cancelar</button>
      </section>
    </div>
  );
};
export default AddTaskModal;
