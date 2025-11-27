import "./UserPanel.css";
import { AnimatePresence, motion } from "framer-motion";
import userPfp from "../assets/images/userPfp.png";
import nameIcon from "../assets/images/name.png";
import emailIcon from "../assets/images/email.png";
import passIcon from "../assets/images/pass.png";
import deleteIcon from "../assets/images/delete.png";
import closeIcon from "../assets/images/close.png";
import { useUser } from "../../../context/UserContext";
import { useState, useEffect } from "react";
import { useUserActions } from "../hooks/useUserActions";
import ChangePassModal from "../../auth/components/ChangePassModal/ChangePassModal.jsx";
import { useModal } from "../../tasks/hooks/useModal.js";

function UserPanel({ isOpen, onClose }) {
  const changePassModal = useModal();
  const { userData } = useUser();
  const {
    updateUsername,
    isLoading,
    error,
    successMessage,
    setError,
    setSuccessMessage,
  } = useUserActions();

  const initialUsername = userData?.username || "";
  const initialEmail = userData?.email || "";

  const [newUsername, setNewUsername] = useState(initialUsername);

  useEffect(() => {
    setNewUsername(initialUsername);
  }, [initialUsername, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setSuccessMessage(null);
    }
  }, [isOpen, setError, setSuccessMessage]);

  const handleUpdateUsernameClick = async () => {
    setError(null);
    setSuccessMessage(null);

    await updateUsername(initialUsername, newUsername);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <div className="user-panel" onClick={(e) => e.stopPropagation()}>
            <section className="user-panel__modal-header">
              <p className="user-panel__modal-header-title">Mi cuenta</p>
              <img
                className="user-panel__close-icon"
                src={closeIcon}
                alt="Icono de cerrar"
                onClick={onClose}
              />
            </section>
            <hr />
            <section className="user-panel__heading">
              <img
                className="user-panel__heading-pfp"
                src={userPfp}
                alt="User profile picture"
              />
              <div className="user-panel__heading-content">
                <p className="user-panel__hello-msg">
                  Hola <span>{newUsername}</span>
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
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                disabled={isLoading}
              />
              {error && <p className="error-message">{error}</p>}
              {successMessage && (
                <p className="success-message">{successMessage}</p>
              )}
              <button
                className="user-panel__editable-item-actions-button btn"
                onClick={handleUpdateUsernameClick}
                disabled={isLoading}
              >
                {isLoading ? "Cambiando..." : "Cambiar nombre"}
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
                  value={initialEmail}
                  readOnly
                />
                <p className="error-message">
                  El e-mail no puede ser modificado de momento.
                </p>
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
              <button
                onClick={changePassModal.open}
                className="user-panel__editable-item-actions-button btn"
              >
                Cambiar contraseña
              </button>
              <ChangePassModal
                isOpen={changePassModal.isOpen}
                onClose={changePassModal.close}
              />
            </div>
            <div className="user-panel__editable-item user-panel__editable-item--delete-acount">
              <section className="user-panel__editable-item-heading">
                <p className="user-panel__editable-item-title">
                  Eliminar cuenta
                </p>
                <img
                  className="user-panel__editable-item-icon"
                  src={deleteIcon}
                  alt="Icono de borrar"
                />
              </section>
              <p className="user-panel__editable-item-paragraph">
                La eliminación de tu cuenta es algo permanente. Perderás el
                acceso a toda tu información enseguida.
              </p>
              <button className="user-panel__editable-item-actions-button btn-secondary">
                Eliminar cuenta
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default UserPanel;
