import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema } from "../validation/authSchemas";
import { deleteAccountService } from "../../user/services/userServices";

export const useDeleteAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const form = useForm({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });
  const { handleSubmit, reset } = form;

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      const result = await deleteAccountService(data.password);

      if (result.success) {
        setSuccessMessage("¡Cuenta eliminada exitosamente! Redirigiendo...");
        reset();
      } else {
        setApiError(result.error);
      }
    } catch (error) {
      console.error("Delete account error:", error);
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
  };
};
