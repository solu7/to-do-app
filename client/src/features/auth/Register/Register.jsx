import "./Register.css";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useRegisterForm } from "./hooks/useRegisterForm.js";

import { InputField } from "../../../core/components/InputField/InputField.jsx";

import logo from "../../../core/assets/icons/logo.png";
import userIcon from "../../assets/images/userIcon.png";
import passIcon from "../../assets/images/passIcon.png";
import emailIcon from "../../assets/images/emailIcon.svg";
import homeIcon from "../../../core/assets/icons/homeIcon.svg";

function Register() {
  const { handleSubmit, generalError, success, register, errors } = useRegisterForm();
  return (
    <div className="register">
      <div className="register-container">
        <div className="register-header">
          <img className="register-logo" src={logo} alt="App Logo" />
          <h1>
            todo-<span>app</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <InputField
            inputIcon={userIcon}
            inputTitle="Username"
            placeholder="Pick your username"
            type="text"
            inputName="username"
            register={register}
            errors={errors}
          />
          <InputField
            inputIcon={emailIcon}
            inputTitle="E-mail"
            placeholder="yourname@email.com"
            type="email"
            inputName="email"
            register={register}
            errors={errors}
          />

          <InputField
            inputIcon={passIcon}
            inputTitle="Password"
            placeholder="Place a secure password"
            type="password"
            inputName="password"
            register={register}
            errors={errors}
          />

          <InputField
            inputIcon={passIcon}
            inputTitle="Confirm password"
            placeholder="Confirm your password"
            type="password"
            inputName="confirmPassword"
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
                <p>{generalError}</p>
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
                  ¡Usuario registrado <span>correctamente!</span>
                </p>
                <hr className="success-message-hr" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="register-buttons">
            <button type="submit" className="btn register-btn">
              Create account
            </button>
            <Link to="/login">
              <button className="btn-secondary register-btn-sec">
                Already have an account? Log in
              </button>
            </Link>
          </div>
        </form>
        <Link to="/">
          <div className="register-back-home">
            <img src={homeIcon} alt="Icono de HomePage" />
            <p>Back to Homepage</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Register;
