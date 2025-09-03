const API_URL = import.meta.env.VITE_API_URL;

export async function getAllCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener las categorias.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCategoriesInTask({ taskId }) {
  try {
    const response = await fetch(`${API_URL}/categories/${taskId}`, {
      method: "GET",
      body: JSON.stringify(),
      credentials: "include",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al obtener categorias");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}