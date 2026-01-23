const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el inicio de sesion");
  }

  return await response.json();
}

export async function loginAsGuest() {
  try {
    const response = await fetch(`${API_URL}/auth/guest`, {
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
        error: result.message || "Error al iniciar sesión como invitado.",
      };
    }
  } catch (error) {
    console.error("Login Guest Error:", error);
    return { success: false, error: "Error de conexión con el servidor." };
  }
}
