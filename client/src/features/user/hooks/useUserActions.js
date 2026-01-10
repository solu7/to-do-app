import { useState } from "react";
import { updateUsernameService } from "../services/UserServices";
import { useUser } from "../../../context/UserContext";

export const useUserActions = () => {
  const { fetchUserData } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const updateUsername = async (currentUsername, newUsername) => {
    const trimmedUsername = newUsername.trim();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (trimmedUsername === currentUsername || trimmedUsername === "") {
      setError(
        "El nuevo nombre debe ser diferente al actual y no puede estar vacío."
      );
      setIsLoading(false);
      return false;
    }
    try {
      const result = await updateUsernameService(trimmedUsername);

      if (result.success) {
        await fetchUserData();
        setSuccessMessage(
          result.data.message || "Nombre actualizado con éxito."
        );
        setIsLoading(false);
        return true;
      } else {
        setError(result.error);
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError("Fallo al conectar con el servicio de actualización.");
      setIsLoading(false);
      return false;
    }
  };

  return {
    updateUsername,
    isLoading,
    error,
    successMessage,
    setError,
    setSuccessMessage,
  };
};
