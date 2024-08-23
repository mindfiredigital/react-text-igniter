import { useState } from 'react';

export const usePreviewMode = () => {
 const [isToolbarVisible, setToolbarVisibility] = useState(false);

 const toggleToolbarVisibility = () => {
   setToolbarVisibility((prev) => !prev);
 };

 return { isToolbarVisible, toggleToolbarVisibility };
}