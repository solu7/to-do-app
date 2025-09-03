import { useEffect } from 'react';

const useAutoGrowTextarea = (ref, value) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [ref, value]);
};

export default useAutoGrowTextarea;