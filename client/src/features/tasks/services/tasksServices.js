const API_URL = import.meta.env.VITE_API_URL;

export async function createTask({ title, description }) {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear tarea");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getLatestTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      body: JSON.stringify(),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener tareas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}