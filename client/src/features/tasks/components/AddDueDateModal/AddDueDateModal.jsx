import "./AddDueDateModal.css";
import ReactDOM from "react-dom";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import DatePicker from "react-datepicker";
import { formatModalDynamicLabel } from "../../utils/taskDateFormatter";
import { addDays, nextSaturday, nextMonday } from "date-fns";
import { es } from "date-fns/locale";
import { useSmartPosition } from "../../../../core/hooks/useSmartPosition";
import todayIcon from "../../assets/images/ItemIcon/today.png";
import tomorrowIcon from "../../assets/images/ItemIcon/tomorrow.png";
import afterTomorrowIcon from "../../assets/images/ItemIcon/afterTomorrow.png";
import thisWeekendIcon from "../../assets/images/ItemIcon/thisWeekend.png";
import nextWeekIcon from "../../assets/images/ItemIcon/nextWeek.png";
import noDateIcon from "../../assets/images/ItemIcon/noDate.png";

function AddDueDateModal({
  isOpen,
  onClose,
  selectedDueDate,
  handleDueDateChange,
  formattedDateText,
}) {
  const today = new Date();

  const { elementRef, getStyles, animationProps } = useSmartPosition(isOpen);

  const onSelectDate = (date) => {
    handleDueDateChange(date);
    onClose();
  };

  const tomorrow = addDays(today, 1);
  const afterTomorrow = addDays(today, 2);
  const thisWeekend = nextSaturday(today);
  const nextWeekStart = nextMonday(today);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal__overlay--invisible"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={elementRef}
            className="add-dd-modal__container"
            style={getStyles()}
            {...animationProps}
            onClick={(e) => e.stopPropagation()}
          >
            <section className="add-dd-modal__selected-date">
              <p>
                {selectedDueDate
                  ? `${formattedDateText}`
                  : "Agrega una fecha !"}
              </p>
            </section>
            <hr />
            <ul className="add-dd-modal__date-filters-list">
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(today)}
              >
                <img src={todayIcon} alt="Icono de calendario" />
                <div className="add-dd-modal__filter-date">
                  <span>Hoy</span>
                  <span>{formatModalDynamicLabel(today)}</span>
                </div>
              </li>
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(tomorrow)}
              >
                <img src={tomorrowIcon} alt="Icono de un amanecer" />
                <div className="add-dd-modal__filter-date">
                  <span>Mañana</span>
                  <span>{formatModalDynamicLabel(tomorrow)}</span>
                </div>
              </li>
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(afterTomorrow)}
              >
                <img src={afterTomorrowIcon} alt="Icono de calendario 2" />
                <div className="add-dd-modal__filter-date">
                  <span>Pasado mañana</span>
                  <span>{formatModalDynamicLabel(afterTomorrow)}</span>
                </div>
              </li>
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(thisWeekend)}
              >
                <img src={thisWeekendIcon} alt="Icono de un sofa" />
                <div className="add-dd-modal__filter-date">
                  <span>Este fin de semana</span>
                  <span>{formatModalDynamicLabel(thisWeekend)}</span>
                </div>
              </li>
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(nextWeekStart)}
              >
                <img
                  src={nextWeekIcon}
                  alt="Icono de un calendario adelantado"
                />
                <div className="add-dd-modal__filter-date">
                  <span>Proxima semana</span>
                  <span>{formatModalDynamicLabel(nextWeekStart)}</span>
                </div>
              </li>
              <li
                className="add-dd-modal__date-filter-item"
                onClick={() => onSelectDate(null)}
              >
                <img src={noDateIcon} alt="Icono de quitar" />
                <span>Sin fecha</span>
              </li>
            </ul>
            <hr />
            <DatePicker
              selected={selectedDueDate}
              onChange={onSelectDate}
              locale={es}
              dateFormat="dd/MM/yyyy"
              showOutsideDays={false}
              inline
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
export default AddDueDateModal;
