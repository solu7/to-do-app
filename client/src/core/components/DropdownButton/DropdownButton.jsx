import "./DropdownButton.css";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropdownWrapper from "../DropdownWrapper/DropdownWrapper.jsx";
import closeIcon from "../../../features/assets/images/close.png";

function DropdownButton({
  buttonText,
  buttonIcon,
  itemList,
  itemListIcon,
  onItemClick,
  onAddClick,
  onRemoveClick,
  keepOpen = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [positionClass, setPositionClass] = useState("");

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keepOpen) return;
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
  }, [isOpen, keepOpen]);

  useEffect(() => {
    if (keepOpen) setIsOpen(true);
  }, [keepOpen]);

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      const spaceRight = windowWidth - rect.right;
      const spaceLeft = rect.left;

      if (spaceRight < 50) {
        setPositionClass("menu-align-right");
      } else if (spaceLeft < 50) {
        setPositionClass("menu-align-left");
      } else {
        setPositionClass("menu-align-center");
      }
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (keepOpen) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={dropdownRef} className="dropdown-button" onClick={handleToggle}>
      <DropdownWrapper buttonIcon={buttonIcon} buttonText={buttonText} />
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={`dropdown-button__menu ${positionClass}`}
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
              <li
                className="dropdown-menu__item item-to-remove"
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick?.(item);
                  setIsOpen(false);
                }}
              >
                <div className="dropdown-menu__item-header">
                  {(itemListIcon || item.icon) && (
                    <img
                      className="dropdown-menu__item-icon"
                      src={item.icon || itemListIcon}
                      alt={`Icono de ${item.name}`}
                    />
                  )}
                  {item.name}
                </div>
                {onRemoveClick && (
                  <img
                    className="remove-button"
                    src={closeIcon}
                    alt="Icono de cerrar"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveClick(item.id);
                    }}
                  />
                )}
              </li>
            ))}
            {onAddClick && (
              <li
                className="add-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddClick(e);
                }}
              >
                <span>+</span>
                <p>Crear</p>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
export default DropdownButton;
