import { useCallback } from 'react';

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
      if (command === 'bold') {
        if (newStyles.has('bold')) {
          newStyles.delete('bold');
        } else {
          newStyles.add('bold');
        }
      } else if (command === 'italic') {
        if (newStyles.has('italic')) {
          newStyles.delete('italic');
        } else {
          newStyles.add('italic');
        }
      } else if (command === 'underline') {
        if (newStyles.has('underline')) {
          newStyles.delete('underline');
        } else {
          newStyles.add('underline');
        }
      } else if (command === 'superscript') {
        if (newStyles.has('super')) {
          newStyles.delete('super');
        } else {
          newStyles.add('super');
        }
      } else if (command === 'subscript') {
        if (newStyles.has('sub')) {
          newStyles.delete('sub');
        } else {
          newStyles.add('sub');
        }
      }

      // Update the data-type attribute with the modified styles
      activeBlock.setAttribute('data-type', Array.from(newStyles).join('-') || 'normal');
    }
  }, []);

  return { formatText, updateDataAttributes };
};
