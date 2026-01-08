import {
  format,
  isToday,
  isTomorrow,
  isSameWeek,
  isSameYear,
  parseISO,
} from "date-fns";
import { es } from "date-fns/locale";

const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatTaskCardDate = (dateInput) => {
  if (!dateInput) return null;
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
  const today = new Date();

  if (isToday(date)) return "Hoy";
  if (isTomorrow(date)) return "Mañana";

  if (isSameWeek(date, today, { weekStartsOn: 1 })) {
    return capitalize(format(date, "eeee", { locale: es }));
  }

  const pattern = isSameYear(date, today) ? "d MMM" : "d MMM yyyy";
  return capitalize(format(date, pattern, { locale: es }));
};

export const formatModalDynamicLabel = (dateInput) => {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
  const today = new Date();

  const pattern = isSameWeek(date, today, { weekStartsOn: 1 })
    ? "eee"
    : "eee d MMM";

  return format(date, pattern, { locale: es });
};

export const formatEditPanelHeader = (dateInput) => {
  if (!dateInput) return "Agrega una fecha!";

  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "Fecha inválida";

  const today = new Date();

  const dayName = capitalize(format(date, "eeee", { locale: es }));
  const monthDay = capitalize(format(date, "MMM dd", { locale: es }));

  const base = `${dayName} - ${monthDay}`;

  return isSameYear(date, today) ? base : `${base} - ${format(date, "yyyy")}`;
};
