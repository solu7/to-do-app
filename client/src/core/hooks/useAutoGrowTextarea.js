// useAutosizeTextArea.js
import { useEffect } from "react";

const useAutosizeTextArea = (textAreaRef, value) => {
  useEffect(() => {
    // 1. Nos aseguramos de que el elemento existe y hay un valor
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;

      // 2. Resetea la altura
      textArea.style.height = "auto";

      // 3. Establece la altura al 'scrollHeight'
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [textAreaRef, value]); // Siempre se ejecuta al cambiar el valor
};

export default useAutosizeTextArea;
