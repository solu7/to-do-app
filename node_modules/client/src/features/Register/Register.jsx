import "./Register.css";
import { useState } from "react";
import { registerUser } from "./registerService";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/logo.png";
import userIcon from "./assets/images/userIcon.png";
import passIcon from "./assets/images/passIcon.png";
import emailIcon from "./assets/images/emailIcon.svg";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./validationSchema";

function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  console.log("Objeto errors actual:", errors);

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    try {
      const response = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      console.log("Registro exitoso:", response);
      setSuccess("¡Usuario registrado correctamente!");
      reset();
    } catch (err) {
      console.error("Error al registrar el usuario:", err);

      if (
        err.details &&
        err.details.errors &&
        Array.isArray(err.details.errors)
      ) {
        err.details.errors.forEach((backendError) => {
          if (backendError.path) {
            setError(backendError.path, {
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
        setError(
          "Ocurrió un error inesperado al intentar registrar el usuario."
        );
      }
    }
  };
  return (
    <div className="register">
      <div className="register-subcontainer">
        <div className="register-header">
          <img className="register-logo" src={logo} alt="App Logo" />
          <h1>
            todo-<span>app</span>
          </h1>
        </div>
        <form>
          <div className="register-inputs-container">
            <section className="register-input-header">
              <img src={userIcon} alt="Icono de usuario" />
              <p>Username</p>
            </section>
            <input
              type="text"
              placeholder="Pick your username"
              {...register("username")}
            />
            <AnimatePresence>
              {errors.username && (
                <motion.p
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
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {errors.username.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="register-inputs-container">
            <section className="register-input-header">
              <img src={emailIcon} alt="Icono de email" />
              <p>E-mail</p>
            </section>
            <input
              type="email"
              placeholder="yourname@email.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="register-inputs-container">
            <section className="register-input-header">
              <img src={passIcon} alt="Icono de password" />
              <p>Password</p>
            </section>
            <input
              type="password"
              placeholder="Place a secure password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="register-inputs-container">
            <section className="register-input-header">
              <img src={passIcon} alt="Icono de password" />
              <p>Confirm password</p>
            </section>
            <input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
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
              exit={{ opacity: 0, height: 0, marginTop: 0, padding: "0 10px" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <p>
                ¡Usuario registrado <span>correctamente!</span>
              </p>
              <hr className="success-message-hr" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="register-inputs-container create-acc">
          <button onClick={handleSubmit(onSubmit)} className="btn register-btn">
            Create account
          </button>
          <button className="btn-secondary register-btn-sec">
            Already have an account? Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
