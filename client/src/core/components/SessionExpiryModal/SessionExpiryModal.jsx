import * as FramerMotion from "framer-motion";
const { motion, AnimatePresence } = FramerMotion;
import "./SessionExpiryModal.css";

export default function SessionExpiryModal({
  isOpen,
  onExtend,
  onLogout,
  isGuest,
}) {
  const content = isGuest
    ? {
        title: "¡Tu sesión de invitado va a expirar!",
        msg: "Como invitado, tus datos se borrarán si sales. ¿Quieres extender tu tiempo de prueba o prefieres terminar ahora?",
        btnCancel: "Salir y borrar",
        btnConfirm: "Extender sesión",
      }
    : {
        title: "¡Tu sesión ha expirado!",
        msg: "Por seguridad, tu sesión ha caducado. ¿Deseas renovarla para seguir trabajando o prefieres salir?",
        btnCancel: "Cerrar sesión",
        btnConfirm: "Renovar sesión",
      };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="session-modal__container"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <h3 className="session-modal__title">{content.title}</h3>
            <p className="session-modal__msg">{content.msg}</p>
            <div className="session-modal__actions">
              <button className="btn-secondary" onClick={onLogout}>
                {content.btnCancel}
              </button>
              <button className="btn" onClick={onExtend}>
                {content.btnConfirm}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
