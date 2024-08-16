import { useState, useCallback } from 'react';

export const useHeadingState = () => {
  // State to store the current heading
  const [currentHeading, setCurrentHeading] = useState('p');

  // Function to change the current heading
  const changeHeading = useCallback((heading) => {
    setCurrentHeading(heading);
  }, []);

  return { currentHeading, changeHeading };
};