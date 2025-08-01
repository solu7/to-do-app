import "./InputField.css"

import { motion, AnimatePresence } from "framer-motion";

export function InputField({
  inputIcon,
  inputTitle,
  placeholder,
  type,
  inputName,
  register,
  errors
}) {
  const fieldError = errors[inputName];
  return (
    <div className="input-field">
      <section className="input-field-header">
        <img src={inputIcon} alt="Icono de password" />
        <p>{inputTitle}</p>
      </section>
      <input type={type} placeholder={placeholder} {...register(inputName)} />
      <AnimatePresence>
        {fieldError && (
          <motion.p
            key={`${inputName}-error`}
            className="input-field-error-message"
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginTop: 0,
              y: -10,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {fieldError.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
