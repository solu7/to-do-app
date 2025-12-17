import "./AddDueDateModal.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import addDays from "date-fns/addDays";
import nextSaturday from "date-fns/nextSaturday";
import nextMonday from "date-fns/nextMonday";
import { format, isSameWeek } from "date-fns";
import tomorrowIcon from "../../assets/images/ItemIcon/tomorrow.png";
import laterThisWeekIcon from "../../assets/images/ItemIcon/laterThisWeek.png";
import thisWeekendIcon from "../../assets/images/ItemIcon/thisWeekend.png";
import nextWeekIcon from "../../assets/images/ItemIcon/nextWeek.png";
import noDateIcon from "../../assets/images/ItemIcon/noDate.png";

function AddDueDateModal({
  task,
  isOpen,
  onClose,
  selectedDueDate,
  handleDueDateChange,
  formattedDateText,
}) {
  const today = new Date();

  const getDynamicLabel = (date) => {
    if (!date) return "";

    const sameWeek = isSameWeek(date, today, { weekStartsOn: 1 });

    if (sameWeek) {
      return format(date, "eee", { locale: es });
    } else {
      return format(date, "eee d MMM", { locale: es });
    }
  };

  const onSelectDate = (date) => {
    handleDueDateChange(date);
    onClose();
  };

  const tomorrow = addDays(today, 1);
  const afterTomorrow = addDays(today, 2);
  const thisWeekend = nextSaturday(today);
  const nextWeekStart = nextMonday(today);
  return (
    isOpen && (
      <div className="add-dd-modal">
        <section className="add-dd-modal__selected-date">
          <p>
            {selectedDueDate ? `${formattedDateText}` : "Agrega una fecha !"}
          </p>
        </section>
        <hr />
        <ul className="add-dd-modal__date-filters-list">
          <li
            className="add-dd-modal__date-filter-item"
            onClick={() => onSelectDate(tomorrow)}
          >
            <img src={tomorrowIcon} alt="Icono de un amanecer" />
            <div className="add-dd-modal__filter-date">
              <span>Mañana</span>
              <span>{getDynamicLabel(tomorrow)}</span>
            </div>
          </li>
          <li
            className="add-dd-modal__date-filter-item"
            onClick={() => onSelectDate(afterTomorrow)}
          >
            <img src={laterThisWeekIcon} alt="Icono de calendario" />
            <div className="add-dd-modal__filter-date">
              <span>Pasado mañana</span>
              <span>{getDynamicLabel(afterTomorrow)}</span>
            </div>
          </li>
          <li
            className="add-dd-modal__date-filter-item"
            onClick={() => onSelectDate(thisWeekend)}
          >
            <img src={thisWeekendIcon} alt="Icono de un sofa" />
            <div className="add-dd-modal__filter-date">
              <span>Este fin de semana</span>
              <span>{getDynamicLabel(thisWeekend)}</span>
            </div>
          </li>
          <li
            className="add-dd-modal__date-filter-item"
            onClick={() => onSelectDate(nextWeekStart)}
          >
            <img src={nextWeekIcon} alt="Icono de un calendario adelantado" />
            <div className="add-dd-modal__filter-date">
              <span>Proxima semana</span>
              <span>{getDynamicLabel(nextWeekStart)}</span>
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
      </div>
    )
  );
}
export default AddDueDateModal;
