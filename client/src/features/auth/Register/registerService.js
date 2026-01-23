const API_URL = import.meta.env.VITE_API_URL;

export async function registerUser({ username, email, password }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error en el registro");
  }

  return await response.json();
}
