import { useCallback } from 'react';
import featuresData from '../assets/features.json';

// Custom hook for handling editor text formatting and data attributes
export const useEditorFormatting = (editorRef) => {
  // Function to update data attributes (e.g., bold, italic, underline) based on block styles
  const updateDataAttributes = useCallback((block) => {
    // Retrieve computed styles of the block element
    const styles = window.getComputedStyle(block);
    const fontWeight = styles.getPropertyValue('font-weight');
    const fontStyle = styles.getPropertyValue('font-style');
    const textDecoration = styles.getPropertyValue('text-decoration');

    // Determine data type based on styles
    let dataType = [];
    if (fontWeight === 'bold' || fontWeight >= 600) dataType.push('bold');
    if (fontStyle === 'italic') dataType.push('italic');
    if (textDecoration.includes('underline')) dataType.push('underline');

    // Set the data-type attribute of the block element
    block.setAttribute('data-type', dataType.join('-') || 'normal');
  }, []);

  // Function to format text within the editor block based on given command and value
  const formatText = useCallback((command, value = null) => {
    const activeBlock = document.querySelector('.editor-block.active');
    if (activeBlock) {
      activeBlock.focus();
      document.execCommand(command, false, value);
  
      const currentDataType = activeBlock.getAttribute('data-type') || 'normal';
      const currentStyles = currentDataType.split('-');
      let newStyles = new Set(currentStyles);
  
      Object.values(featuresData.features).forEach(feature => {
        if (command === feature.tag) {
          if (newStyles.has(feature.tag)) {
            newStyles.delete(feature.tag);
          } else {
            newStyles.add(feature.tag);
          }
        }
      });
  
      activeBlock.setAttribute('data-type', Array.from(newStyles).join('-') || 'normal');
      updateDataAttributes(activeBlock);
    }
  }, [updateDataAttributes]);
  const applyHeading = useCallback((heading) => {
    const activeBlock = document.querySelector('.editor-block.active');
    if (activeBlock) {
      const newElement = document.createElement(heading);
      newElement.innerHTML = activeBlock.innerHTML;
      newElement.className = activeBlock.className;
      newElement.setAttribute('contentEditable', 'true');
      newElement.setAttribute('data-type', activeBlock.getAttribute('data-type') || 'normal');
      activeBlock.parentNode.replaceChild(newElement, activeBlock);
      newElement.focus();
      newElement.classList.add('active');
    }
  }, []);
  return { formatText, updateDataAttributes,applyHeading };
};
