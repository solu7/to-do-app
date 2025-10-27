const API_URL = import.meta.env.VITE_API_URL;

export async function getTaskPriority({ taskId }) {
  try {
    const response = await fetch(`${API_URL}/priorities/${taskId}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener la prioridad de la tarea."
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getTaskPriority:", error);
    return null;
  }
}

export async function setTaskPriority(taskId, newPriority) {
  try {
    const response = await fetch(`${API_URL}/priorities/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priority: newPriority }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al establecer la prioridad de la tarea."
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en setTaskPriority:", error);
    throw error;
  }
}
