import "./DeleteAccountModal.css";
import { useEffect } from "react";
import { useDeleteAccount } from "../../hooks/useDeleteAccount";
import { InputField } from "../../../../core/components/InputField/InputField";
import passIcon from "../../../user/assets/images/pass.png";
import closeIcon from "../../../user/assets/images/close.png";
import { useNavigation } from "../../../../core/hooks/useNavigation.js";
import { useUser } from "../../../../context/UserContext.jsx";
import StatusMessage from "../../../../core/components/StatusMessage/StatusMessage.jsx";

const REDIRECTION_DELAY_MS = 3000;

function DeleteAccountModal({ isOpen, onClose }) {
  const { goToHome } = useNavigation();
  const { userData } = useUser();
  const isGuest = userData?.is_guest;
  const { form, onSubmit, isLoading, apiError, successMessage } =
    useDeleteAccount();

  const {
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        onClose();
        goToHome();
      }, REDIRECTION_DELAY_MS);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [successMessage, onClose, goToHome]);
  const isDisabled = isLoading;
  return (
    isOpen && (
      <div className="modal-overlay" onClick={isDisabled ? undefined : onClose}>
        <form
          className="delete-account-modal"
          onClick={(e) => e.stopPropagation()}
          onSubmit={onSubmit}
        >
          <section className="delete-account-modal__header">
            <p className="delete-account-modal__header-title">
              Eliminar mi cuenta
            </p>
            <img
              className="delete-account-modal__close-icon"
              src={closeIcon}
              alt="Icono de cerrar"
              onClick={onClose}
              style={{ pointerEvents: isDisabled ? "none" : "auto" }}
            />
          </section>
          <hr />
          {!isGuest ? (
            <>
              <div className="delete-account-modal__info">
                <p>
                  Lamento que te vayas, pero{" "}
                  <span>gracias por probar mi app !</span>
                </p>
                <p>
                  La eliminación de la cuenta es totalmente permanente. Vas a
                  perder el acceso a toda tu información de inmediato.
                </p>
              </div>
              <fieldset className="delete-account-modal__input-container">
                <InputField
                  inputIcon={passIcon}
                  inputTitle="Contraseña Actual"
                  type="password"
                  inputName="password"
                  placeholder="Ingrese su contraseña actual"
                  register={register}
                  errors={errors}
                />
                <p className="delete-account-modal__delete-condition">
                  Para eliminar tu cuenta, es necesario que introduzcas tu
                  contraseña actual como confirmación
                </p>
              </fieldset>
              <button type="submit" className="btn" disabled={isDisabled}>
                {isLoading ? "Eliminando..." : "Eliminar cuenta"}
              </button>
            </>
          ) : (
            <p className="success-message">
              No puedes eliminar la cuenta de invitado.
            </p>
          )}
          <StatusMessage message={apiError} type="error" />
          <StatusMessage message={successMessage} type="success" />
          <StatusMessage message={isLoading} type="success" />
        </form>
      </div>
    )
  );
}
export default DeleteAccountModal;
