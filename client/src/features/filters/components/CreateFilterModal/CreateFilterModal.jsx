import "./CreateFilterModal.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import closeIcon from "../../../assets/images/close.png";

function CreateFilterModal({ isOpen, onClose, onSubmit, title, placeholder }) {
  const [inputValue, setInputValue] = useState("");

  const handleConfirm = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      setInputValue("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="create-filter-modal__container"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
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
    </AnimatePresence>
  );
}

export default CreateFilterModal;
