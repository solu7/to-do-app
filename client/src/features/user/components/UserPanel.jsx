import "./UserPanel.css";
import userPfp from "../assets/images/userPfp.png";

function UserPanel() {
  return (
    <div className="modal-overlay">
      <div className="user-panel">
        <section className="user-panel__heading">
          <img
            className="user-panel__user-pfp"
            src={userPfp}
            alt="User profile picture"
          />
          <p className="user-panel__hello-msg">
            Hola <span>Nombre!</span>
          </p>
        </section>
        <div className="user-panel__editable-item">
          <p className="user-panel__editable-item-title">Nombre</p>
          <input className="user-panel__editable-item-actions-input" type="text" placeholder="First name" />
        </div>
        <div className="user-panel__editable-item">
          <p className="user-panel__editable-item-title">Email</p>
          <section className="user-panel__editable-item-actions">
            <p className="user-panel__editable-item-paragraph">
              correo@correouser.com
            </p>
            <button className="user-panel__editable-item-actions-button btn">
              Cambiar email
            </button>
          </section>
        </div>
        <div className="user-panel__editable-item">
          <p className="user-panel__editable-item-title">Contraseña</p>
          <button className="user-panel__editable-item-actions-button btn ">
            Cambiar contrasena
          </button>
        </div>
        <div className="user-panel__editable-item user-panel__editable-item--delete-acount">
          <p className="user-panel__editable-item-title">Eliminar cuenta</p>
          <p className="user-panel__editable-item-paragraph">
            La eliminación de tu cuenta es algo permanente. Perderás el acceso a
            toda tu información enseguida.
          </p>
          <button className="user-panel__editable-item-actions-button btn">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserPanel;
