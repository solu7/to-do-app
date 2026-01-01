import { useState, useEffect, useRef, useCallback } from "react";

export const useResizer = (initialWidth = 400, maxWidthPercentage = 0.9) => {
  const [elementWidth, setElementWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const elementRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    const rect = elementRef.current.getBoundingClientRect();
    if (Math.abs(e.clientX - rect.left) < 10) {
      setIsResizing(true);
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e) => {
      const newWidth = window.innerWidth - e.clientX;
      const maxWidth = window.innerWidth * maxWidthPercentage;
      
      if (newWidth > 300 && newWidth < maxWidth) {
        setElementWidth(newWidth);
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.userSelect = "none";
    document.body.style.cursor = "ew-resize";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "default";
    };
  }, [isResizing, maxWidthPercentage]);

  return { elementWidth, elementRef, isResizing, handleMouseDown };
};
