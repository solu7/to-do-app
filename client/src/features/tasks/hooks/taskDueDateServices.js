const API_URL = import.meta.env.VITE_API_URL;

export function formatDateForDisplay(dateString) {
  if (!dateString) {
    return "Fecha para la tarea";
  }

  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("es-ES", { month: "short" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

  return `${capitalizedMonth} ${day}`;
}

export async function useGetTaskDueDate({ taskId }) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/date`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener la fecha de la tarea."
      );
    }

    const data = await response.json();
    return data.due_date;
  } catch (error) {
    console.error("Error en useGetTaskDate:", error);
  }
}

export async function useSetTaskDueDate({ taskId, date }) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date: date }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al guardar la fecha de la tarea."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
