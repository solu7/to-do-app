import { useState, useEffect } from "react";
import { useTaskData } from "../../tasks/services/useTaskData";
import {
  useGetTaskDate,
  useSetTaskDate,
  formatDateForDisplay,
} from "../services/dateServices";

export const useTaskDate = (task) => {
  const { data: rawTaskDate, refetch: refetchTaskDate } = useTaskData(
    task,
    useGetTaskDate
  );

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (
      task &&
      rawTaskDate &&
      rawTaskDate[task.id] &&
      rawTaskDate[task.id].length > 0
    ) {
      const dateFromApi = rawTaskDate[task.id][0].date;
      setSelectedDate(new Date(dateFromApi));
    } else {
      setSelectedDate(null);
    }
  }, [task, rawTaskDate]);

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    if (task && task.id && date) {
      try {
        const formattedDate = date.toISOString().split("T")[0];
        await useSetTaskDate({ taskId: task.id, date: formattedDate });
        refetchTaskDate();
      } catch (error) {
        console.error("Error al guardar la fecha:", error);
      }
    }
  };

  const formattedDateText =
    task && rawTaskDate && rawTaskDate[task.id] && rawTaskDate[task.id].length > 0
      ? formatDateForDisplay(rawTaskDate[task.id][0].date)
      : "Agrega una fecha!";

  return {
    selectedDate,
    handleDateChange,
    formattedDateText,
  };
};