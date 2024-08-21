import { useCallback, useState, useEffect } from "react";

export const useEditorFormatting = (editorRef) => {
  const [activeStyles, setActiveStyles] = useState([]);

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

  const formatText = useCallback((command, value = null) => {
    const editor = editorRef.current;
    if (editor) {
      document.execCommand(command, false, value);
      updateActiveStyles();
    }
  }, [editorRef]);

  const applyHeading = useCallback((heading) => {
    const editor = editorRef.current;
    if (editor) {
      document.execCommand('formatBlock', false, heading);
      updateActiveStyles();
    }
  }, [editorRef]);

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
      }
    }
  }, [editorRef]);

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
  }, [editorRef]);

  const updateActiveStyles = useCallback(() => {
    const editor = editorRef.current;
    if (editor) {
      const styles = [];
      if (document.queryCommandState('bold')) styles.push('bold');
      if (document.queryCommandState('italic')) styles.push('italic');
      if (document.queryCommandState('underline')) styles.push('underline');
      if (document.queryCommandState('insertOrderedList')) styles.push('orderedList');
      if (document.queryCommandState('insertUnorderedList')) styles.push('unorderedList');
      if (document.queryCommandState('justifyLeft')) styles.push('justifyLeft');
      if (document.queryCommandState('justifyCenter')) styles.push('justifyCenter');
      if (document.queryCommandState('justifyRight')) styles.push('justifyRight');
      if (document.queryCommandState('superscript')) styles.push('superscript');
      if (document.queryCommandState('subscript')) styles.push('subscript');
      setActiveStyles(styles);
    }
  }, [editorRef]);

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

  return { formatText, updateDataAttributes, applyHeading, addImageOrVideo, addLink, activeStyles };
};