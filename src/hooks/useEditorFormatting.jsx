import { useCallback, useState, useEffect } from "react";

export const useEditorFormatting = (editorRef) => {
  const [activeStyles, setActiveStyles] = useState(["justifyLeft"]); // Set initial justifyLeft

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

  const updateActiveStyles = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const styles = new Set();

      // Check command states for text formatting
      if (document.queryCommandState('bold')) styles.add('bold');
      if (document.queryCommandState('italic')) styles.add('italic');
      if (document.queryCommandState('underline')) styles.add('underline');

      // Ensure only one list style is selected at a time
      if (document.queryCommandState('insertOrderedList')) {
        styles.add('orderedList');
        styles.delete('unorderedList');
      } else if (document.queryCommandState('insertUnorderedList')) {
        styles.add('unorderedList');
        styles.delete('orderedList');
      } else {
        styles.delete('orderedList');
        styles.delete('unorderedList');
      }

      // Ensure only one justification style is selected at a time
      if (document.queryCommandState('justifyLeft')) {
        styles.add('justifyLeft');
        styles.delete('justifyCenter');
        styles.delete('justifyRight');
      } else if (document.queryCommandState('justifyCenter')) {
        styles.add('justifyCenter');
        styles.delete('justifyLeft');
        styles.delete('justifyRight');
      } else if (document.queryCommandState('justifyRight')) {
        styles.add('justifyRight');
        styles.delete('justifyLeft');
        styles.delete('justifyCenter');
      } else {
        styles.delete('justifyLeft');
        styles.delete('justifyCenter');
        styles.delete('justifyRight');
      }

      setActiveStyles(Array.from(styles));
    }
  }, [editorRef]);

  const formatText = useCallback((command, value = null) => {
    const editor = editorRef.current;
    if (editor) {
      document.execCommand(command, false, value);
      updateActiveStyles();
    }
  }, [editorRef, updateActiveStyles]);

  const applyHeading = useCallback((heading) => {
    const editor = editorRef.current;
    if (editor) {
      document.execCommand('formatBlock', false, heading);
      updateActiveStyles();
    }
  }, [editorRef, updateActiveStyles]);

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
          editor.appendChild(element);
          editor.appendChild(document.createElement('br'));
          updateActiveStyles();
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
        editor.appendChild(element);
        editor.appendChild(document.createElement('br'));
        updateActiveStyles();
      }
    }
  }, [editorRef, updateActiveStyles]);

  const addLink = useCallback((linkText, linkUrl) => {
    const editor = editorRef.current;
    if (editor) {
      const anchor = document.createElement("a");
      anchor.href = linkUrl;
      anchor.textContent = linkText;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      editor.appendChild(anchor);
      editor.appendChild(document.createElement('br'));
      updateActiveStyles();
    }
  }, [editorRef, updateActiveStyles]);

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener('keyup', updateActiveStyles);
      editor.addEventListener('mouseup', updateActiveStyles);
      return () => {
        editor.removeEventListener('keyup', updateActiveStyles);
        editor.removeEventListener('mouseup', updateActiveStyles);
      };
    }
  }, [editorRef, updateActiveStyles]);

  return {
    formatText,
    updateDataAttributes,
    applyHeading,
    addImageOrVideo,
    addLink,
    activeStyles,
  };
};
