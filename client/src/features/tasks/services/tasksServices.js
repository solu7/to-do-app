const API_URL = import.meta.env.VITE_API_URL;

export async function getInboxTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener tareas de Inbox.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getInboxTasks:", error);
    throw error;
  }
}

export async function getAllTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks/all`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener todas las tareas."
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllTasks:", error);
    throw error;
  }
}

export async function getCompletedTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks/completed`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al obtener tareas completadas."
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getCompletedTasks:", error);
    throw error;
  }
}

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
      throw new Error(errorData.message || "Error al crear la tarea.");
    }

    const newTaskData = await response.json();
    return newTaskData;
  } catch (error) {
    throw error;
  }
}

export async function updateTask({ taskId, title, description }) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al actualizar la tarea.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en updateTask:", error);
    throw error;
  }
}

export async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al eliminar la tarea.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error en deleteTask:", error);
    throw error;
  }
}

export const toggleTaskCompletion = async ({ taskId }) => {
  if (typeof taskId === "object" || !taskId) {
    console.error("Error de ID:", taskId);
    throw new Error("ID de tarea no válido proporcionado.");
  }

  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}/toggle`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al alternar el estado de completado de la tarea.");
    }

    return response.json();
  } catch (error) {
    console.error("Error en toggleTaskCompletion:", error);
    throw error;
  }
};
