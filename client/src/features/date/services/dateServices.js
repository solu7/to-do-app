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

export async function useGetTaskDate({ taskId }) {
  try {
    const response = await fetch(`${API_URL}/dates/${taskId}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener la fecha de la tarea."
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getTaskDate:", error);
    return null;
  }
}

export async function useSetTaskDate({ taskId, date }) {
  try {
    const response = await fetch(`${API_URL}/dates/${taskId}`, {
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
