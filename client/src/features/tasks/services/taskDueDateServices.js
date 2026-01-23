const API_URL = import.meta.env.VITE_API_URL;

export async function getTaskDueDate({ taskId }) {
  if (!taskId) return null;

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/date`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener la fecha de la tarea.",
      );
    }

    const data = await response.json();
    return data.due_date;
  } catch (error) {
    console.error("Error en useGetTaskDate:", error);
  }
}

export async function setTaskDueDate({ taskId, date }) {
  if (!taskId) throw new Error("TaskId es requerido para guardar");

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
      errorData.message || "Error al guardar la fecha de la tarea.",
    );
  }

  return await response.json();
}
