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
      activeBlock.focus(); // Ensure the active block has focus
      document.execCommand(command, false, value); // Execute the specified text formatting command

      // Adjust the data-type attribute based on the executed command
      const currentDataType = activeBlock.getAttribute('data-type') || 'normal';
      const currentStyles = currentDataType.split('-');
      let newStyles = new Set(currentStyles);

      // Toggle or update styles based on the command
      if (command === featuresData.features.bold.tag) {
        if (newStyles.has(featuresData.features.bold.tag)) {
          newStyles.delete(featuresData.features.bold.tag);
        } else {
          newStyles.add(featuresData.features.bold.tag);
        }
      } else if (command === featuresData.features.italic.tag) {
        if (newStyles.has(featuresData.features.italic.tag)) {
          newStyles.delete(featuresData.features.italic.tag);
        } else {
          newStyles.add(featuresData.features.italic.tag);
        }
      } else if (command === featuresData.features.underline.tag) {
        if (newStyles.has(featuresData.features.underline.tag)) {
          newStyles.delete(featuresData.features.underline.tag);
        } else {
          newStyles.add(featuresData.features.underline.tag);
        }
      } else if (command === featuresData.features.superscript.tag) {
        if (newStyles.has(featuresData.features.superscript.tag)) {
          newStyles.delete(featuresData.features.superscript.tag);
        } else {
          newStyles.add(featuresData.features.superscript.tag);
        }
      } else if (command === featuresData.features.subscript.tag) {
        if (newStyles.has(featuresData.features.subscript.tag)) {
          newStyles.delete(featuresData.features.subscript.tag);
        } else {
          newStyles.add(featuresData.features.subscript.tag);
        }
      }

      // Update the data-type attribute with the modified styles
      activeBlock.setAttribute('data-type', Array.from(newStyles).join('-') || 'normal');
    }
  }, []);

  return { formatText, updateDataAttributes };
};
