import { useState, useEffect, useRef } from "react";

export const useResizer = (initialWidth, maxWidthPercentage) => {
  const [elementWidth, setElementWidth] = useState(initialWidth);
  const elementRef = useRef(null);
  const isResizing = useRef(false);

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      if (Math.abs(e.clientX - rect.left) < 10) {
        isResizing.current = true;
        document.body.style.cursor = "ew-resize";
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "default";
    };

    const handleMouseMove = (e) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      if (Math.abs(e.clientX - rect.left) < 10) {
        document.body.style.cursor = "ew-resize";
      } else if (!isResizing.current) {
        document.body.style.cursor = "default";
      }

      if (isResizing.current) {
        const newWidth = window.innerWidth - e.clientX;
        const maxWidth = window.innerWidth * maxWidthPercentage;

        if (newWidth <= maxWidth) {
          setElementWidth(newWidth);
        }
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [maxWidthPercentage]);

  return { elementWidth, elementRef };
};
