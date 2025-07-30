import "./DropdownButton.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function DropdownButton({ buttonText, buttonIcon, itemList }) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className="dropdown-button" onClick={handleToggle}>
      <div className="dropdown-button__wrapper">
        <img
          className="dropdown-button__icon"
          src={buttonIcon}
          alt="Dropdown icon"
        />
        <button className="dropdown-button__button">{buttonText}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="dropdown-button__menu"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {itemList.map((item, idx) => (
              <li className="dropdown-menu__item" key={idx}>
                {item.icon && (
                  <img
                    className="dropdown-menu__icon"
                    src={item.icon}
                    alt="Icono de item de lista"
                  />
                )}
                {item.name}
              </li>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DropdownButton;
