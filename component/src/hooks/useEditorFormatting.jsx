import { useCallback, useState, useEffect } from "react";

export const useEditorFormatting = (editorRef) => {
  const [activeStyles, setActiveStyles] = useState(["justifyLeft"]); // Set initial justifyLeft

  const updateDataAttributes = useCallback((element) => {
    const styles = window.getComputedStyle(element);
    const dataType = [];

    if (styles.fontWeight === "bold" || parseInt(styles.fontWeight) >= 600)
      dataType.push("bold");
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
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const parentElement =
          range.commonAncestorContainer.nodeType === Node.TEXT_NODE
            ? range.commonAncestorContainer.parentElement
            : range.commonAncestorContainer;

        // Check text formatting
        if (document.queryCommandState("bold")) styles.add("bold");
        if (document.queryCommandState("italic")) styles.add("italic");
        if (document.queryCommandState("underline")) styles.add("underline");

        // Check list style (only one can be active)
        if (document.queryCommandState("insertOrderedList")) {
          styles.add("orderedList");
        } else if (document.queryCommandState("insertUnorderedList")) {
          styles.add("unorderedList");
        }

        // Check justification (only one can be active)
        const computedStyle = window.getComputedStyle(parentElement);
        const textAlign = computedStyle.textAlign;
        if (textAlign === "left" || textAlign === "start") {
          styles.add("justifyLeft");
        } else if (textAlign === "center") {
          styles.add("justifyCenter");
        } else if (textAlign === "right") {
          styles.add("justifyRight");
        }
      }
      // Check superscript and subscript (only one can be active)
      if (document.queryCommandState("superscript")) {
        styles.add("superscript");
      } else if (document.queryCommandState("subscript")) {
        styles.add("subscript");
      }

      setActiveStyles(Array.from(styles));
    }
  }, [editorRef]);

  const formatText = useCallback(
    (command, value = null) => {
      const editor = editorRef.current;
      if (editor) {
        if (command.startsWith("justify")) {
          // Remove all justify styles before applying the new one
          ["justifyLeft", "justifyCenter", "justifyRight"].forEach((style) => {
            if (style !== command) {
              document.execCommand(style, false, null);
            }
          });
        } else if (
          command === "insertOrderedList" ||
          command === "insertUnorderedList"
        ) {
          // Remove the other list style before applying the new one
          const otherListCommand =
            command === "insertOrderedList"
              ? "insertUnorderedList"
              : "insertOrderedList";
          if (document.queryCommandState(otherListCommand)) {
            document.execCommand(otherListCommand, false, null);
          }
        } else if (command === "superscript" || command === "subscript") {
          // Remove the other script style before applying the new one
          const otherScriptCommand =
            command === "superscript" ? "subscript" : "superscript";
          if (document.queryCommandState(otherScriptCommand)) {
            document.execCommand(otherScriptCommand, false, null);
          }
        }

        document.execCommand(command, false, value);
        updateActiveStyles();
      }
    },
    [editorRef, updateActiveStyles]
  );

  const addImageOrVideo = useCallback(
    (file, fileUrl) => {
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
            editor.appendChild(document.createElement("br"));
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
          editor.appendChild(document.createElement("br"));
          updateActiveStyles();
        }
      }
    },
    [editorRef, updateActiveStyles]
  );

  const addLink = useCallback(
    (linkText, linkUrl) => {
      const editor = editorRef.current;
      if (editor) {
        const anchor = document.createElement("a");
        anchor.href = linkUrl;
        anchor.textContent = linkText;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        editor.appendChild(anchor);
        editor.appendChild(document.createElement("br"));
        updateActiveStyles();
      }
    },
    [editorRef, updateActiveStyles]
  );

  const applyHeading = useCallback(
    (heading) => {
      const editor = editorRef.current;
      if (editor) {
        // Use execCommand to change the format block to the specified heading
        document.execCommand("formatBlock", false, heading);

        // Update active styles to reflect the changes
        updateActiveStyles();
      }
    },
    [editorRef, updateActiveStyles]
  );

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("keyup", updateActiveStyles);
      editor.addEventListener("mouseup", updateActiveStyles);
      return () => {
        editor.removeEventListener("keyup", updateActiveStyles);
        editor.removeEventListener("mouseup", updateActiveStyles);
      };
    }
  }, [editorRef, updateActiveStyles]);

  return {
    formatText,
    updateDataAttributes,
    addImageOrVideo,
    addLink,
    applyHeading,
    activeStyles,
  };
};
