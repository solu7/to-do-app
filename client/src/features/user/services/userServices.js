const API_URL = import.meta.env.VITE_API_URL;
export async function updateUsernameService(newUsername) {
  try {
    const response = await fetch(`${API_URL}/users/username`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ newUsername }),
    });
    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data.message || "Error desconocido" };
    }
  } catch (error) {
    console.error(
      "Erro de conexion en el servicio de actualizar nombre de usuario:",
      error
    );
    return { success: false, error: "Error de conexión con el servidor." };
  }
}
