import { useState, useCallback } from "react";

export const useHeadingState = () => {
  // State to store the current heading tag, defaulting to 'p' (paragraph)
  const [currentHeading, setCurrentHeading] = useState("p");

  // Callback function to update the current heading tag
  const changeHeading = useCallback((heading) => {
    setCurrentHeading(heading);
  }, []);

  // Return the current heading state and the function to update it
  return { currentHeading, changeHeading };
};
