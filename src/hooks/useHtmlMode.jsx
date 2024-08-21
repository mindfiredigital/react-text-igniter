import { useState, useCallback } from 'react';

export const useHtmlMode = () => {
  // State to track whether HTML mode is active
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // Function to toggle HTML mode
  const toggleHtmlMode = useCallback(() => {
    setIsHtmlMode(prevMode => !prevMode);
  }, []);

  return { isHtmlMode, toggleHtmlMode };
};