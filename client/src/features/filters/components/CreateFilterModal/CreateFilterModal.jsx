import "./CreateFilterModal.css";
import ReactDOM from "react-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSmartPosition } from "../../../../core/hooks/useSmartPosition";
import closeIcon from "../../../assets/images/close.png";

function CreateFilterModal({ isOpen, onClose, onClick, title, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  const { elementRef, getStyles, animationProps } = useSmartPosition(isOpen);

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onClick(inputValue.trim());
      setInputValue("");
      onClose();
    }
  };
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal__overlay--invisible" onClick={onClose}>
          <motion.div
            ref={elementRef}
            className="create-filter-modal__container"
            style={getStyles()}
            {...animationProps}
            onClick={(e) => e.stopPropagation()}
          >
            <section className="create-filter-modal__header">
              <p className="create-filter-modal__header-text">Añadir filtro</p>
              <img
                className="create-filter-modal__close-icon"
                src={closeIcon}
                alt="Icono de cerrar"
                onClick={onClose}
              />
            </section>
            <hr />
            <h3 className="create-filter-modal__title">
              Crear <span>{title}</span>
            </h3>
            <fieldset className="create-filter-modal__input-container">
              <p className="create-filter-modal__input-name">Nombre</p>
              <input
                type="text"
                className="create-filter-modal__input"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
            </fieldset>
            <div className="session-modal__actions">
              <button className="btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button className="btn" onClick={handleConfirm}>
                Crear
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
export default CreateFilterModal;
