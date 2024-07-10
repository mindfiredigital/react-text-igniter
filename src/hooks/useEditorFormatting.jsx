import { useCallback } from "react";
import featuresData from "../assets/feature.json";

/**
 * Custom hook for handling editor formatting
 * 
 * @param {React.RefObject} editorRef - Reference to the editor element
 * @returns {Object} Object containing formatting functions
 */
export const useEditorFormatting = (editorRef) => {
  /**
   * Updates data attributes of a block based on its computed styles
   * 
   * @param {HTMLElement} block - The block element to update
   */
  const updateDataAttributes = useCallback((block) => {
    const styles = window.getComputedStyle(block);
    const dataType = [];

    // Check for bold text
    if (styles.fontWeight === "bold" || +styles.fontWeight >= 600)
      dataType.push("bold");
    
    // Check for italic text
    if (styles.fontStyle === "italic") dataType.push("italic");
    
    // Check for underlined text
    if (styles.textDecoration.includes("underline")) dataType.push("underline");
    
    // Set the data-type attribute
    block.setAttribute("data-type", dataType.join("-") || "normal");
  }, []);

  /**
   * Applies formatting to the selected text
   * 
   * @param {string} command - The formatting command to execute
   * @param {string|null} value - Optional value for the command
   */
  const formatText = useCallback((command, value = null) => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      activeBlock.focus();
      document.execCommand(command, false, value);

      const currentDataType = activeBlock.getAttribute("data-type") || "normal";
      const currentStyles = new Set(currentDataType.split("-"));

      const toggleStyle = (style) => {
        currentStyles.has(style)
          ? currentStyles.delete(style)
          : currentStyles.add(style);
      };

      // Handle different formatting commands
      switch (command) {
        case featuresData.features.bold.tag:
        case featuresData.features.italic.tag:
        case featuresData.features.underline.tag:
        case featuresData.features.superscript.tag:
        case featuresData.features.subscript.tag:
          toggleStyle(command);
          break;
        default:
          break;
      }

      // Update the data-type attribute
      activeBlock.setAttribute(
        "data-type",
        Array.from(currentStyles).join("-") || "normal"
      );
    }
  }, []);

  return { formatText, updateDataAttributes };
};