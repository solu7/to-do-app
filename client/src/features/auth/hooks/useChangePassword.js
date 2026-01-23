import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../validation/authSchemas.js";
import { updatePasswordService } from "../../user/services/userServices.js";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onBlur",
  });

  const { handleSubmit, reset } = form;

  const cleanState = useCallback(() => {
    setApiError(null);
    setSuccessMessage(null);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    cleanState();

    try {
      const result = await updatePasswordService({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (result.success) {
        setSuccessMessage("Contraseña actualizada con éxito !");
        reset();
      } else {
        setApiError(result.error);
      }
    } catch (error) {
      console.error("Change Password Error:", error);
      setApiError("Error de conexión o inesperado.");
    } finally {
      setIsLoading(false);
    }
  });

  return {
    form,
    onSubmit,
    isLoading,
    apiError,
    successMessage,
    cleanState,
    resetForm: reset,
  };
};
