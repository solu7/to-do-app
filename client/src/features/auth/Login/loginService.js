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
