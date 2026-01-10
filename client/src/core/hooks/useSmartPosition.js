import { useState, useLayoutEffect, useRef } from "react";

let lastClickElement = null;

if (typeof window !== "undefined") {
  window.addEventListener(
    "mousedown",
    (e) => {
      lastClickElement =
        e.target.closest("button, [role='button'], .btn, a, input") || e.target;
    },
    true
  );
}

export const useSmartPosition = (isOpen) => {
  const [coords, setCoords] = useState({ top: 0, left: 0, isBottom: false });
  const elementRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  useLayoutEffect(() => {
    if (isOpen && elementRef.current) {
      const trigger = lastClickElement || document.activeElement;
      if (!trigger || isMobile) return;

      const anchor = trigger.getBoundingClientRect();
      const modalRect = elementRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      const margin = 40;

      let left = anchor.left + anchor.width / 2 - modalRect.width / 2;
      if (left + modalRect.width > viewportWidth - margin)
        left = viewportWidth - modalRect.width - margin;
      if (left < margin) left = margin;

      let top = anchor.bottom + scrollY + 10;
      let isBottom = false;

      if (anchor.bottom + modalRect.height > viewportHeight - margin) {
        let potentialTop = anchor.top + scrollY - modalRect.height - 10;

        if (potentialTop < scrollY + margin) {
          top = Math.max(
            scrollY + margin + 40,
            anchor.top + scrollY - modalRect.height / 2
          );
        } else {
          top = potentialTop;
          isBottom = true;
        }
      }
      if (top < scrollY + margin) top = scrollY + margin;

      setCoords({ top, left, isBottom });
    }
  }, [isOpen, isMobile]);

  const getStyles = () => {
    if (isMobile)
      return {
        position: "fixed",
        top: "50%",
        left: "50%",
      };
    return {
      position: "absolute",
      top: `${coords.top}px`,
      left: `${coords.left}px`,
    };
  };

  const animationProps = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: isMobile ? "-50%" : coords.isBottom ? 10 : -10,
      x: isMobile ? "-50%" : 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: isMobile ? "-50%" : 0,
      x: isMobile ? "-50%" : 0,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: isMobile ? "-50%" : coords.isBottom ? 10 : -10,
      x: isMobile ? "-50%" : 0,
    },
    transition: { duration: 0.15 },
  };

  return { elementRef, getStyles, animationProps };
};
