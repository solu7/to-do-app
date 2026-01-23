const API_URL = import.meta.env.VITE_API_URL;

export async function logoutUser() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, data: result };
    } else {
      return {
        success: false,
        error: result.message || "Error al cerrar sesión",
      };
    }
  } catch (error) {
    console.error("Logout User Error:", error);
    return { success: false, error: "Error de conexión con el servidor" };
  }
}
