const API_URL = import.meta.env.VITE_API_URL;

export async function createCategory({ name }) {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al crear la categoría.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en createCategory service:", error);
    throw error;
  }
}

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

export async function assignCategoryToTask({ taskId, categoryId }) {
  try {
    const response = await fetch(`${API_URL}/categories/${taskId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al asignar la categoria a la tarea."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function removeCategoryFromTask({ taskId, categoryId }) {
  try {
    const response = await fetch(`${API_URL}/categories/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Error al eliminar la categoría de la tarea."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
