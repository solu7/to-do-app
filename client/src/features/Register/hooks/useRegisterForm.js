import { useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation.js";
import { registerUser } from "../registerService.js";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validationSchema.js";

export const useRegisterForm = () => {
  const { goLoginPage } = useNavigation();

  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError: setFormError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {

    try {
      const response = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log("Registro exitoso:", response);
      setSuccess("¡Usuario registrado correctamente!");
      reset();
      setTimeout(() => {
        goLoginPage();
      }, 3000);
    } catch (err) {
      console.error("Error al registrar el usuario:", err);

      if (
        err.details &&
        err.details.errors &&
        Array.isArray(err.details.errors)
      ) {
        err.details.errors.forEach((backendError) => {
          if (backendError.path) {
            setFormError(backendError.path, {
              type: "backend",
              message: backendError.msg,
            });
          } else {
            setFormError(backendError.msg);
          }
        });
      } else if (err.message) {
        setGeneralError(err.message);
      } else {
        setGeneralError(
          "Ocurrió un error inesperado al intentar registrar el usuario."
        );
      }
    }
  };
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    generalError,
    success,
    reset,
  };
};
