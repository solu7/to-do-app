import { useCallback, useEffect, useRef } from "react";

const useAutoGrowTextArea = (text) => {
  const textareaRef = useRef(null);

  const adjustHeight = useCallback(() => {
    const element = textareaRef.current;
    if (element) {
      element.style.setProperty("height", "auto", "important");
      const newHeight = element.scrollHeight;
      if (newHeight > 0) {
        element.style.height = `${newHeight}px`;
      }
    }
  }, []);

  useEffect(() => {
    adjustHeight();
    const rafId = requestAnimationFrame(adjustHeight);
    const timeout1 = setTimeout(adjustHeight, 50);
    const timeout2 = setTimeout(adjustHeight, 200);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [adjustHeight, text]);

  return { textareaRef, adjustHeight };
};

export default useAutoGrowTextArea;
