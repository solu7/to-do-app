import "./PriorityPicker.css";

import priority1Icon from "../../../assets/images/priority1Icon.svg";
import priority2Icon from "../../../assets/images/priority2Icon.svg";
import priority3Icon from "../../../assets/images/priority3Icon.svg";
import priority4Icon from "../../../assets/images/priority4Icon.svg";

function PriorityPicker({ priority, setPriority }) {
  return (
    <ul className="priority-picker">
      <li className="priority-pick">
        <img className="priorityIcon" src={priority1Icon} alt="Icono de prioridad 1" />
        Prioridad 1
      </li>
      <li className="priority-pick">
        <img className="priorityIcon" src={priority2Icon} alt="Icono de prioridad 2" />
        Prioridad 2
      </li>
      <li className="priority-pick">
        <img className="priorityIcon" src={priority3Icon} alt="Icono de prioridad 3" />
        Prioridad 3
      </li>
      <li className="priority-pick">
        <img className="priorityIcon" src={priority4Icon} alt="Icono de prioridad 4" />
        Prioridad 4
      </li>
    </ul>
  );
}
export default PriorityPicker;
