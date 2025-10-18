import addIcon from "../../../assets/images/addIcon.png";
import inboxIcon from "../../../assets/images/inboxIcon.png";
import todayIcon from "../../../assets/images/todayIcon.png";
import upcomingIcon from "../../../assets/images/upcomingIcon.png";
import labelsIcon from "../../../assets/images/tagIcon.png";
import completedIcon from "../../../assets/images/completedIcon.png";

export const navItems = [
  {
    icon: addIcon,
    name: "Añade una tarea",
    action: "addTask",
  },
  {
    icon: inboxIcon,
    name: "Bandeja de entrada",
    action: "inbox",
    path: "/dashboard",
  },
  {
    icon: todayIcon,
    name: "Para hoy",
    action: "today",
    path: "/dashboard/today",
  },
  {
    icon: upcomingIcon,
    name: "¿Que sigue?",
    action: "upcoming",
    path: "/dashboard/upcoming",
  },
  {
    icon: labelsIcon,
    name: "Categorias y filtros",
    action: "filters",
    path: "/dashboard/filters",
  },
  {
    icon: completedIcon,
    name: "Completados",
    action: "completed",
    path: "/dashboard/completed",
  },
];
