import "./UserPanel.css";
import userPfp from "../assets/images/userPfp.png";
import nameIcon from "../assets/images/name.png";
import emailIcon from "../assets/images/email.png";
import passIcon from "../assets/images/pass.png";
import deleteIcon from "../assets/images/delete.png";

function UserPanel() {
  const password = "contrasena";
  const email = "correo@usercorreo.com";
  const name = "Nombre";
  return (
    <div className="modal-overlay">
      <div className="user-panel">
        <section className="user-panel__heading">
          <img
            className="user-panel__heading-pfp"
            src={userPfp}
            alt="User profile picture"
          />
          <div className="user-panel__heading-content">
            <p className="user-panel__hello-msg">
              Hola <span>Nombre!</span>
            </p>
            <section className="user-panel__heading-actions">
              <button className="user-panel__heading-actions-button btn">
                Cambiar foto de perfil
              </button>
              <button className="user-panel__heading-actions-button btn-secondary">
                Eliminar foto de perfil
              </button>
            </section>
          </div>
        </section>
        <div className="user-panel__editable-item">
          <section className="user-panel__editable-item-heading">
            <p className="user-panel__editable-item-title">Nombre</p>
            <img
              className="user-panel__editable-item-icon"
              src={nameIcon}
              alt="Icono de identificacion"
            />
          </section>
          <input
            className="user-panel__editable-item-actions-input"
            type="text"
            value={name}
          />
          <button className="user-panel__editable-item-actions-button btn">
            Cambiar nombre
          </button>
        </div>
        <div className="user-panel__editable-item">
          <section className="user-panel__editable-item-heading">
            <p className="user-panel__editable-item-title">Email</p>
            <img
              className="user-panel__editable-item-icon"
              src={emailIcon}
              alt="Icono de email"
            />
          </section>
          <section className="user-panel__editable-item-actions">
            <input
              className="user-panel__editable-item-actions-input"
              type="email"
              value={email}
            />
            <button className="user-panel__editable-item-actions-button btn-secondary">
              Cambiar email
            </button>
          </section>
        </div>
        <div className="user-panel__editable-item">
          <section className="user-panel__editable-item-heading">
            <p className="user-panel__editable-item-title">Contraseña</p>
            <img
              className="user-panel__editable-item-icon"
              src={passIcon}
              alt="Icono de password"
            />
          </section>
          <button className="user-panel__editable-item-actions-button btn">
            Cambiar contraseña
          </button>
        </div>
        <div className="user-panel__editable-item user-panel__editable-item--delete-acount">
          <section className="user-panel__editable-item-heading">
            <p className="user-panel__editable-item-title">Eliminar cuenta</p>
            <img
              className="user-panel__editable-item-icon"
              src={deleteIcon}
              alt="Icono de borrar"
            />
          </section>
          <p className="user-panel__editable-item-paragraph">
            La eliminación de tu cuenta es algo permanente. Perderás el acceso a
            toda tu información enseguida.
          </p>
          <button className="user-panel__editable-item-actions-button btn-secondary">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserPanel;
