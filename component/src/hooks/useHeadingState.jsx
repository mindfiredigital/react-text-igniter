import { useState, useCallback } from "react";

export const useHeadingState = () => {
  const [currentHeading, setCurrentHeading] = useState('p');

  const changeHeading = useCallback((heading) => {
    setCurrentHeading(heading);
    document.execCommand('formatBlock', false, heading);
  }, []);

  return { currentHeading, changeHeading };
};