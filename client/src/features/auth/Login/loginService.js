const API_URL = import.meta.env.VITE_API_URL;

export async function loginUser({ email, password }) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.message || "Error en el inicio de sesion");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginAsGuest() {
  const GUEST_EMAIL = "guest@taskapp.com";
  const GUEST_PASSWORD = "Admin123!";

  try {
    const data = await loginUser({
      email: GUEST_EMAIL,
      password: GUEST_PASSWORD,
    });
    return data;
  } catch (error) {
    throw new Error(
      "No se pudo iniciar sesión como invitado. Verifique el usuario de prueba en el backend."
    );
  }
}
