import "react-datepicker/dist/react-datepicker.css";
import "./AddTaskModal.css";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import PriorityPicker from "../utils/PriorityPicker/PriorityPicker";

const AddTaskModal = () => {
  const [priorityPickerIsOpen, setPriorityPickerIsOpen] = useState(false);
  const pickerContainerRef = useRef(null);
  const handlePicker = () => {
    setPriorityPickerIsOpen((priorityPickerIsOpen) => !priorityPickerIsOpen);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        priorityPickerIsOpen &&
        pickerContainerRef.current &&
        !pickerContainerRef.current.contains(event.target)
      ) {
        setPriorityPickerIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [priorityPickerIsOpen]);

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
            onClick={handlePicker}
            locale={es}
            dateFormat="dd/MM/yyyy"
            customInput={<button className="modal-filter-button">Fecha</button>}
          />
        </div>
        <div ref={pickerContainerRef} className="task-modal-filter">
          <img src="" alt="" />
          <button onClick={handlePicker} className="modal-filter-button">
            Prioridad
          </button>
          {!!priorityPickerIsOpen && <PriorityPicker />}
        </div>
        <div className="task-modal-filter">
          <img src="" alt="" />
          <button className="modal-filter-button">Categoria</button>
        </div>
        <div className="task-modal-filter">
          <img src="" alt="" />
          <button className="modal-filter-button">Tag</button>
        </div>
      </section>
      <section className="task-modal-buttons">
        <button className="task-modal-add-btn">Añadir tarea</button>
        <button className="task-modal-second-btn">Cancelar</button>
      </section>
    </div>
  );
};
export default AddTaskModal;
