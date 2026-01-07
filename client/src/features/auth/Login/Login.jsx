import "./Login.css";
import { useState } from "react";
import { InputField } from "../../../core/components/InputField/InputField.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authSchemas.js";
import { useForm } from "react-hook-form";
import { useNavigation } from "../../../core/hooks/useNavigation.js";
import { loginUser } from "./loginService.js";
import StatusMessage from "../../../core/components/StatusMessage/StatusMessage.jsx";
import logo from "../../../core/assets/icons/logo.png";
import passIcon from "../../assets/images/passIcon.png";
import emailIcon from "../../assets/images/emailIcon.svg";
import homeIcon from "../../../core/assets/icons/homeIcon.svg";

function Login() {
  const { goToDashboard, goToHome } = useNavigation();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setError("");

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log("Login exitoso:", response);
      setSuccessMsg("¡Usuario logeado correctamente!");
      reset();
      setTimeout(() => {
        goToDashboard();
      }, 2500);
    } catch (err) {
      console.error("Error al logear el usuario:", err);
      if (err.details?.errors && Array.isArray(err.details.errors)) {
        err.details.errors.forEach((backendError) => {
          if (backendError.path) {
            setFormError(backendError.path, {
              type: "backend",
              message: backendError.msg,
            });
          } else {
            setError(backendError.msg);
          }
        });
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado al intentar logear el usuario.");
      }
    }
  };
  return (
    <div className="login">
      <div className="login-header">
        <img className="login-logo" src={logo} alt="App Logo" />
        <h1>
          todo-<span>app</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          inputIcon={emailIcon}
          inputTitle="E-mail"
          placeholder="Enter your email"
          type="email"
          inputName="email"
          register={register}
          errors={errors}
        />

        <InputField
          inputIcon={passIcon}
          inputTitle="Password"
          placeholder="Enter your password"
          type="password"
          inputName="password"
          register={register}
          errors={errors}
        />
        {error && (
          <div className="login__status-msg">
            <StatusMessage message={error} type="error" />
            <hr className="error-message-hr" />
          </div>
        )}
        {successMsg && (
          <div className="login__status-msg">
            <StatusMessage message={successMsg} type="success" />
            <hr className="success-message-hr" />
          </div>
        )}
        <div className="login-buttons">
          <button type="submit" className="btn login-btn">
            Log in
          </button>
          <p className="btn-secondary login-btn">Forgot your password?</p>
        </div>
      </form>
      <div className="login-back-home" role="button" onClick={goToHome}>
        <img src={homeIcon} alt="Icono de HomePage" />
        <p>Back to Homepage</p>
      </div>
    </div>
  );
}
export default Login;
