import "./ChangePassModal.css";

function ChangePassModal({ isOpen, onClose }) {
  return (
    isOpen && (
      <div className="modal-overlay" onClick={onClose}>
        <form
          className="change-pass-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <fieldset className="change-pass-modal__input-container">
            <label htmlFor="actual-pass">Contrase;a actual</label>
            <input type="password" id="actual-pass" name="actual-pass" />
          </fieldset>
          <fieldset className="change-pass-modal__input-container">
            <label htmlFor="new-pass">Nueva contraseña</label>
            <input type="password" id="new-pass" name="new-pass" />
          </fieldset>
          <fieldset className="change-pass-modal__input-container">
            <label htmlFor="confirm-new-pass">
              Confirma la nueva contraseña
            </label>
            <input
              type="password"
              id="confirm-new-pass"
              name="confirm-new-pass"
            />
          </fieldset>
          <button className="btn" type="submit">Cambiar la contraseña</button>
        </form>
      </div>
    )
  );
}
export default ChangePassModal;
