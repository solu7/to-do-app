import "./Register.css";
import StatusMessage from "../../../core/components/StatusMessage/StatusMessage.jsx";
import { useRegisterForm } from "./hooks/useRegisterForm.js";
import { useNavigation } from "../../../core/hooks/useNavigation.js";
import { InputField } from "../../../core/components/InputField/InputField.jsx";
import logo from "../../../core/assets/icons/logo.png";
import userIcon from "../../assets/images/userIcon.png";
import passIcon from "../../assets/images/passIcon.png";
import emailIcon from "../../assets/images/emailIcon.svg";
import homeIcon from "../../../core/assets/icons/homeIcon.svg";

function Register() {
  const { handleSubmit, generalError, success, register, errors } =
    useRegisterForm();
  const { goLoginPage, goToHome } = useNavigation();
  return (
    <div className="register">
      <div className="register-header">
        <img className="register-logo" src={logo} alt="App Logo" />
        <h1>
          todo-<span>app</span>
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          inputIcon={userIcon}
          inputTitle="Nombre de usuario"
          placeholder="Elige tu nombre"
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
          inputTitle="Contraseña"
          placeholder="Elija una contraseña segura"
          type="password"
          inputName="password"
          register={register}
          errors={errors}
        />

        <InputField
          inputIcon={passIcon}
          inputTitle="Confirme su contraseña"
          placeholder="Introduzca nuevamente su contraseña"
          type="password"
          inputName="confirmPassword"
          register={register}
          errors={errors}
        />
        <StatusMessage message={generalError} type="error" />
        <StatusMessage message={success} type="success" />
        <div className="register-buttons">
          <button type="submit" className="btn register-btn">
            Crear cuenta
          </button>
          <button
            className="btn-secondary register-btn-sec"
            role="button"
            onClick={goLoginPage}
          >
            Ya tienes una cuenta? Inicia sesion
          </button>
        </div>
      </form>
      <div className="register-back-home" role="button" onClick={goToHome}>
        <img src={homeIcon} alt="Icono de HomePage" />
        <p>Volver a la pagina de inicio</p>
      </div>
    </div>
  );
}

export default Register;
