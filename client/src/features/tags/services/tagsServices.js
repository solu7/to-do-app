const API_URL = import.meta.env.VITE_API_URL;

export async function getAllTags() {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener los tags.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTagsInTask({ taskId }) {
  try {
    const response = await fetch(`${API_URL}/tags/${taskId}`, {
      method: "GET",
      body: JSON.stringify(),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener tags");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function assignTagToTask({ taskId, tagId }) {
  try {
    const response = await fetch(`${API_URL}/tags/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tagId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al asignar el tag a la tarea.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
