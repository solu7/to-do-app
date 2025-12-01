import "./ChangePassModal.css";
import { useEffect } from "react";
import { useChangePassword } from "../../hooks/useChangePassword";
import { InputField } from "../../../../core/components/InputField/InputField";
import passIcon from "../../../user/assets/images/pass.png";
import closeIcon from "../../../user/assets/images/close.png";

const AUTO_CLOSE_TIME_MS = 2500;

function ChangePassModal({ isOpen, onClose }) {
  const {
    form,
    onSubmit,
    isLoading,
    apiError,
    successMessage,
    cleanState,
    resetForm,
  } = useChangePassword();

  useEffect(() => {
    if (!isOpen) {
      cleanState();
      resetForm();
    }
  }, [isOpen, cleanState, resetForm]);

  const {
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        onClose();
      }, AUTO_CLOSE_TIME_MS);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [successMessage, onClose]);
  return (
    isOpen && (
      <div
        className="modal-overlay"
        onClick={successMessage ? undefined : onClose}
      >
        <form
          className="change-pass-modal"
          onClick={(e) => e.stopPropagation()}
          onSubmit={onSubmit}
        >
          <section className="change-pass-modal__header">
            <p className="change-pass-modal__header-title">
              Cambiar mi contraseña
            </p>
            <img
              className="change-pass-modal__close-icon"
              src={closeIcon}
              alt="Icono de cerrar"
              onClick={onClose}
            />
          </section>
          <hr />
          {apiError && <p className="error-message">{apiError}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          <InputField
            inputIcon={passIcon}
            inputTitle="Contraseña Actual"
            type="password"
            inputName="currentPassword"
            placeholder="Ingrese su contraseña actual"
            register={register}
            errors={errors}
          />
          <InputField
            inputIcon={passIcon}
            inputTitle="Nueva Contraseña"
            type="password"
            inputName="newPassword"
            placeholder="Cree una nueva contraseña segura"
            register={register}
            errors={errors}
          />
          <InputField
            inputIcon={passIcon}
            inputTitle="Confirma la nueva contraseña"
            type="password"
            inputName="confirmNewPassword"
            placeholder="Confirme la nueva contraseña"
            register={register}
            errors={errors}
          />
          <button
            className="btn"
            type="submit"
            disabled={isLoading || successMessage}
          >
            {isLoading ? "Guardando..." : "Cambiar la contraseña"}
          </button>
        </form>
      </div>
    )
  );
}
export default ChangePassModal;
