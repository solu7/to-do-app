import "./Login.css";
import { motion, AnimatePresence } from "framer-motion";

import { Link } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../../../core/components/InputField/InputField.jsx";
import { useForm } from "react-hook-form";
import { useNavigation } from "../../../core/hooks/useNavigation.js";
import { loginUser } from "./loginService.js";

import logo from "../../../core/assets/icons/logo.png";
import passIcon from "../../assets/images/passIcon.png";
import emailIcon from "../../assets/images/emailIcon.svg";
import homeIcon from "../../../core/assets/icons/homeIcon.svg";

function Login() {
  const { goToDashboard } = useNavigation();
  const [generalError, setGeneralError] = useState("");
  const [success, setSuccess] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    setError: setFormError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setGeneralError("");

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log("Login exitoso:", response);
      setSuccess("¡Usuario logeado correctamente!");
      reset();
      setTimeout(() => {
        goToDashboard();
      }, 2500);
    } catch (err) {
      console.error("Error al logear el usuario:", err);

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
          "Ocurrió un error inesperado al intentar logear el usuario."
        );
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

          <AnimatePresence>
            {!!generalError && (
              <motion.div
                className="error-message"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  padding: "0 10px",
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <p>
                  Email o contraseña <span>incorrectos</span>
                </p>
                <hr className="error-message-hr" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!!success && (
              <motion.div
                className="success-message"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  marginTop: 0,
                  padding: "0 10px",
                }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <p>
                  ¡Usuario logeado <span>correctamente!</span>
                </p>
                <hr className="success-message-hr" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="login-buttons">
            <button type="submit" className="btn login-btn">
              Log in
            </button>
            <p className="btn-secondary login-btn">Forgot your password?</p>
          </div>
        </form>
        <Link to="/">
          <div className="login-back-home">
            <img src={homeIcon} alt="Icono de HomePage" />
            <p>Back to Homepage</p>
          </div>
        </Link>
      </div>
  );
}
export default Login;
