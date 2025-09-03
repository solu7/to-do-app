import "./DropdownButton.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropdownWrapper from "../DropdownWrapper/DropdownWrapper.jsx";

function DropdownButton({ buttonText, buttonIcon, itemList, itemListIcon }) {
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
      <DropdownWrapper buttonIcon={buttonIcon} buttonText={buttonText} />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
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
                {!!itemListIcon && (
                  <img
                    className="dropdown-menu__icon"
                    src={itemListIcon}
                    alt="Icono de item de lista"
                  />
                )}
                {item.name}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DropdownButton;
