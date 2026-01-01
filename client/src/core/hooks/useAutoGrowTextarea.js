import { useCallback } from "react";

const useAutoGrowTextArea = () => {
  const adjustHeight = useCallback((element) => {
    if (element) {
      element.style.setProperty("height", "auto", "important");

      const newHeight = element.scrollHeight;
      if (newHeight > 0) {
        element.style.height = `${newHeight}px`;
      }
    }
  }, []);

  return adjustHeight;
};

export default useAutoGrowTextArea;
