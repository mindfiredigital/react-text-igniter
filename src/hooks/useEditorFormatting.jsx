import { useCallback } from "react";

export const useEditorFormatting = (editorRef) => {
  // Function to update data attributes based on applied styles
  const updateDataAttributes = useCallback((element) => {
    const styles = window.getComputedStyle(element);
    const dataType = [];

    if (styles.fontWeight === "bold" || parseInt(styles.fontWeight) >= 600) dataType.push("bold");
    if (styles.fontStyle === "italic") dataType.push("italic");
    if (styles.textDecoration.includes("underline")) dataType.push("underline");
    if (styles.textAlign === "left") dataType.push("justifyLeft");
    if (styles.textAlign === "center") dataType.push("justifyCenter");
    if (styles.textAlign === "right") dataType.push("justifyRight");

    element.setAttribute("data-type", dataType.join("-") || "normal");
  }, []);

  // Function to apply text formatting
  const formatText = useCallback((command, value = null) => {
    const editor = editorRef.current;
    if (editor) {
      document.execCommand(command, false, value);
      
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;
      
      if (parentElement !== editor) {
        updateDataAttributes(parentElement);
      }
    }
  }, [editorRef, updateDataAttributes]);

  // Function to apply heading to selected text
  const applyHeading = useCallback((heading) => {
    const editor = editorRef.current;
    if (editor) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      
      const newElement = document.createElement(heading);
      range.surroundContents(newElement);
      
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editorRef]);

  // Function to add image or video to the editor
  const addImageOrVideo = useCallback((file, fileUrl) => {
    const editor = editorRef.current;
    if (editor) {
      let element;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.type.startsWith("image/")) {
            element = document.createElement("img");
            element.src = e.target.result;
            element.alt = file.name;
          } else if (file.type.startsWith("video/")) {
            element = document.createElement("video");
            element.src = e.target.result;
            element.controls = true;
          }
          insertElement(element);
        };
        reader.readAsDataURL(file);
      } else if (fileUrl) {
        if (fileUrl.match(/\.(jpeg|jpg|gif|png)$/)) {
          element = document.createElement("img");
          element.src = fileUrl;
          element.alt = "Inserted image";
        } else if (fileUrl.match(/\.(mp4|webm|ogg)$/)) {
          element = document.createElement("video");
          element.src = fileUrl;
          element.controls = true;
        }
        insertElement(element);
      }
    }
  }, [editorRef]);

  // Helper function to insert an element into the editor
  const insertElement = (element) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(element);
    range.setStartAfter(element);
    range.setEndAfter(element);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  // Function to add a link to the editor
  const addLink = useCallback((linkText, linkUrl) => {
    const editor = editorRef.current;
    if (editor) {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      const anchor = document.createElement("a");
      anchor.href = linkUrl;
      anchor.textContent = linkText;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";

      range.deleteContents();
      range.insertNode(anchor);

      range.setStartAfter(anchor);
      range.setEndAfter(anchor);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, [editorRef]);

  return { formatText, updateDataAttributes, applyHeading, addImageOrVideo, addLink };
};