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
    if (styles.fontWeight === "bold" || +styles.fontWeight >= 600) dataType.push("bold");

    // Check for italic text
    if (styles.fontStyle === "italic") dataType.push("italic");

    // Check for underlined text
    if (styles.textDecoration.includes("underline")) dataType.push("underline");

    // Check for text alignment
    if (styles.textAlign === "left") dataType.push("justifyLeft");
    if (styles.textAlign === "center") dataType.push("justifyCenter");
    if (styles.textAlign === "right") dataType.push("justifyRight");

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
        currentStyles.has(style) ? currentStyles.delete(style) : currentStyles.add(style);
      };

      // Handle different formatting commands
      switch (command) {
        case featuresData.features.bold.tag:
        case featuresData.features.italic.tag:
        case featuresData.features.underline.tag:
        case featuresData.features.superscript.tag:
        case featuresData.features.subscript.tag:
        case featuresData.features.justifyLeft.tag:
        case featuresData.features.justifyCenter.tag:
        case featuresData.features.justifyRight.tag:
        case featuresData.features.orderedList.tag:
        case featuresData.features.unorderedList.tag:
          toggleStyle(command);
          break;
        default:
          break;
      }

      // Update the data-type attribute
      activeBlock.setAttribute("data-type", Array.from(currentStyles).join("-") || "normal");
    }
  }, []);

  const addImageOrVideo = useCallback((file, imageUrl) => {
    const editorContainer = document.getElementById("editor");
    var activeBlock = document.querySelector(".editor-block.active");

    if (!activeBlock) {
      const div = document.createElement("div");
      div.className = "editor-block active";
      div.contentEditable = true;
      div.dataset.type = "normal";
      editorContainer.appendChild(div);
      activeBlock = div;
    }

    const appendMedia = (element) => {
      element.style.maxWidth = "100%";
      activeBlock.appendChild(element);

      // Create a new line for the user to continue writing
      const newLine = document.createElement("p");
      newLine.classList.add("editor-block");
      newLine.innerHTML = "<br>"; // Ensures the new paragraph has some content so it is not collapsed
      activeBlock.parentNode.insertBefore(newLine, activeBlock.nextSibling);

      // Optionally, make the new line the active block
      activeBlock.classList.remove("active");
      newLine.classList.add("active");
    };

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let element;
        if (file.type.startsWith("image/")) {
          element = document.createElement("img");
          element.src = e.target.result;
          element.alt = file.name;
        } else if (file.type.startsWith("video/")) {
          element = document.createElement("video");
          element.src = e.target.result;
          element.controls = true;
          element.alt = file.name;
        }
        appendMedia(element);
      };
      reader.readAsDataURL(file);
    } else if (imageUrl) {
      let element;
      if (imageUrl.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        element = document.createElement("img");
        element.src = imageUrl;
        element.alt = "Inserted image";
      } else if (imageUrl.match(/\.(mp4|webm|ogg)$/) != null) {
        element = document.createElement("video");
        element.src = imageUrl;
        element.controls = true;
        element.alt = "Inserted video";
      }
      appendMedia(element);
    }
  }, []);

  // Applies a heading tag to the active block
  const applyHeading = useCallback((heading) => {
    const activeBlock = document.querySelector(".editor-block.active");
    if (activeBlock) {
      const newElement = document.createElement(heading);
      newElement.innerHTML = activeBlock.innerHTML;
      newElement.className = activeBlock.className;
      newElement.setAttribute("contentEditable", "true");
      newElement.setAttribute("data-type", activeBlock.getAttribute("data-type") || "normal");
      activeBlock.parentNode.replaceChild(newElement, activeBlock);
      newElement.focus();
      newElement.classList.add("active");
    }
  }, []);
  return { formatText, updateDataAttributes, applyHeading, addImageOrVideo };
};
