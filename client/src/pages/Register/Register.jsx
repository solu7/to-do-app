import "./Register.css";
import logo from "../../assets/images/logo.png";
import userIcon from "./assets/images/userIcon.png"
import passIcon from "./assets/images/passIcon.png"
import emailIcon from "./assets/images/emailIcon.svg"
import { use } from "react";

function Register() {
  return (
    <div className="register">
      <div className="register-subcontainer">
        <div className="register-header">
      <img className="register-logo" src={logo} alt="App Logo" />
      <h1>todo-<span>app</span></h1>
      </div>
      <form action="">
        
        <div className="register-inputs-container">
          <section className="register-input-header">
          <img src={userIcon} alt="Icono de usuario" />
        <p>Username</p>
        </section>
        <input type="text" placeholder="Pick your username"/>
        </div>

        <div className="register-inputs-container">
          <section className="register-input-header">
          <img src={emailIcon} alt="Icono de email" />
        <p>E-mail</p>
        </section>
        <input type="email" name="" id="" placeholder="yourname@email.com"/>
        </div>

        <div className="register-inputs-container">
          <section className="register-input-header">
          <img src={passIcon} alt="Icono de password" />
        <p>Password</p>
        </section>
        <input type="password" placeholder="Place a secure password"/>
        </div>

        <div className="register-inputs-container">
          <section className="register-input-header">
          <img src={passIcon} alt="Icono de password" />
        <p>Confirm password</p>
        </section>
        <input type="password" placeholder="Confirm your password"/>
        </div>
      </form>
      <div className="register-inputs-container create-acc">
              <button className="btn register-btn">Create account</button>
        <button className="btn-secondary register-btn-sec">Already have an account? Log in</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
